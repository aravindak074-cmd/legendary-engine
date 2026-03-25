"""
Sentinel FI - Python SDK for AI Agent Integration

This SDK enables AI agents (OpenClaw, LangChain, AutoGen, etc.) to:
1. Propose financial actions to the Sentinel guardrail engine
2. Receive validation decisions (approve/reject/modify)
3. Execute approved transactions through Sentinel's custody layer
4. Monitor performance and compliance in real-time

Usage:
    from sentinel import AgentClient, ActionProposal, TransactionType
    
    # Initialize client with agent credentials
    client = AgentClient(
        agent_id="my-agent-001",
        api_key="sk_live_...",
        environment="production"  # or "sandbox", "shadow"
    )
    
    # Propose an action
    proposal = ActionProposal(
        transaction_type=TransactionType.CRYPTO_SWAP,
        params={
            "from_asset": "USDC",
            "to_asset": "ETH",
            "amount": 10000,
            "slippage_tolerance": 0.005
        },
        rationale="Rebalancing portfolio based on market conditions"
    )
    
    # Submit for validation
    decision = await client.submit_proposal(proposal)
    
    if decision.approved:
        # Execute through Sentinel's secure execution layer
        result = await client.execute(decision.transaction_id)
        print(f"Transaction executed: {result.tx_hash}")
    else:
        print(f"Rejected: {decision.reason}")
        # Optionally modify and resubmit
"""

import asyncio
import hashlib
import hmac
import json
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional
from uuid import uuid4

import httpx


class TransactionType(str, Enum):
    """Supported financial transaction types."""
    # Crypto
    CRYPTO_SWAP = "crypto_swap"
    CRYPTO_TRANSFER = "crypto_transfer"
    DEFI_STAKE = "defi_stake"
    DEFI_UNSTAKE = "defi_unstake"
    DEFI_LEND = "defi_lend"
    DEFI_BORROW = "defi_borrow"
    DEX_TRADE = "dex_trade"
    
    # Traditional Finance
    STOCK_BUY = "stock_buy"
    STOCK_SELL = "stock_sell"
    ETF_TRADE = "etf_trade"
    BOND_TRADE = "bond_trade"
    OPTIONS_TRADE = "options_trade"
    
    # Payments & Spending
    PAYMENT_SEND = "payment_send"
    VENDOR_PAYMENT = "vendor_payment"
    SUBSCRIPTION_MANAGE = "subscription_manage"
    PAYROLL_PROCESS = "payroll_process"
    
    # Treasury
    YIELD_OPTIMIZE = "yield_optimize"
    REBALANCE_PORTFOLIO = "rebalance_portfolio"
    CURRENCY_EXCHANGE = "currency_exchange"


class TrustLevel(str, Enum):
    """Agent trust levels determining capital limits and permissions."""
    LEVEL_0_REGISTERED = "level_0"  # Registration only
    LEVEL_1_SANDBOX = "level_1"     # Sandbox simulation
    LEVEL_2_LIMITED = "level_2"     # Limited live capital
    LEVEL_3_AUTONOMOUS = "level_3"  # Full autonomy within guardrails


class DecisionStatus(str, Enum):
    """Validation decision status."""
    APPROVED = "approved"
    REJECTED = "rejected"
    MODIFIED = "modified"
    PENDING_REVIEW = "pending_review"
    CIRCUIT_BREAKER = "circuit_breaker"


@dataclass
class ActionProposal:
    """Represents a financial action proposed by an AI agent."""
    transaction_type: TransactionType
    params: Dict[str, Any]
    rationale: str
    context: Dict[str, Any] = field(default_factory=dict)
    priority: str = "normal"  # low, normal, high, critical
    expires_at: Optional[float] = None
    
    def __post_init__(self):
        if self.expires_at is None:
            self.expires_at = time.time() + 300  # 5 minute default expiry
        self.proposal_id = str(uuid4())
        self.created_at = time.time()
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "proposal_id": self.proposal_id,
            "transaction_type": self.transaction_type.value,
            "params": self.params,
            "rationale": self.rationale,
            "context": self.context,
            "priority": self.priority,
            "expires_at": self.expires_at,
            "created_at": self.created_at
        }
    
    def sign(self, private_key: str) -> str:
        """Cryptographically sign the proposal."""
        message = json.dumps(self.to_dict(), sort_keys=True)
        signature = hmac.new(
            private_key.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
        return signature


@dataclass
class ValidationDecision:
    """Response from Sentinel guardrail engine."""
    proposal_id: str
    status: DecisionStatus
    approved: bool
    transaction_id: Optional[str] = None
    reason: Optional[str] = None
    modifications: Optional[Dict[str, Any]] = None
    risk_score: float = 0.0
    policy_violations: List[str] = field(default_factory=list)
    required_actions: List[str] = field(default_factory=list)
    valid_until: Optional[float] = None
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class ExecutionResult:
    """Result of executing an approved transaction."""
    transaction_id: str
    success: bool
    tx_hash: Optional[str] = None
    amount: Optional[float] = None
    fee: Optional[float] = None
    timestamp: float = 0.0
    error_message: Optional[str] = None
    confirmations: int = 0
    block_number: Optional[int] = None


@dataclass
class AgentStatus:
    """Current status and metrics for an agent."""
    agent_id: str
    trust_level: TrustLevel
    capital_allocated: float
    capital_deployed: float
    unrealized_pnl: float
    realized_pnl: float
    active_positions: int
    pending_proposals: int
    total_transactions: int
    success_rate: float
    last_activity: float
    risk_metrics: Dict[str, Any] = field(default_factory=dict)
    compliance_status: str = "compliant"


class SentinelAPIError(Exception):
    """Base exception for Sentinel API errors."""
    def __init__(self, message: str, status_code: Optional[int] = None):
        super().__init__(message)
        self.status_code = status_code


class GuardrailViolationError(SentinelAPIError):
    """Raised when a proposal violates guardrail policies."""
    def __init__(self, message: str, violations: List[str]):
        super().__init__(message)
        self.violations = violations


class AgentClient:
    """
    Main client for AI agents to interact with Sentinel FI platform.
    
    Features:
    - Proposal submission and validation
    - Transaction execution
    - Status monitoring
    - Event streaming
    - Performance analytics
    """
    
    def __init__(
        self,
        agent_id: str,
        api_key: str,
        environment: str = "sandbox",
        base_url: Optional[str] = None,
        timeout: float = 30.0
    ):
        self.agent_id = agent_id
        self.api_key = api_key
        self.environment = environment
        
        if base_url is None:
            urls = {
                "sandbox": "https://api.sandbox.sentinel.fi",
                "shadow": "https://api.shadow.sentinel.fi",
                "production": "https://api.sentinel.fi"
            }
            base_url = urls.get(environment, urls["sandbox"])
        
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        
        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=httpx.Timeout(timeout),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "User-Agent": "sentinel-python-sdk/1.0.0",
                "X-Agent-ID": agent_id
            }
        )
        
        self._event_handlers = {}
    
    async def _request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict] = None,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Make authenticated API request."""
        try:
            response = await self._client.request(
                method=method,
                url=endpoint,
                json=data,
                params=params
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            error_data = e.response.json() if e.response.content else {}
            
            if e.response.status_code == 403:
                violations = error_data.get("violations", [])
                raise GuardrailViolationError(
                    error_data.get("message", "Guardrail violation"),
                    violations
                )
            
            raise SentinelAPIError(
                error_data.get("message", str(e)),
                status_code=e.response.status_code
            )
    
    async def submit_proposal(
        self,
        proposal: ActionProposal,
        private_key: Optional[str] = None
    ) -> ValidationDecision:
        """
        Submit an action proposal for guardrail validation.
        
        Args:
            proposal: The action proposal to validate
            private_key: Optional key to cryptographically sign the proposal
        
        Returns:
            ValidationDecision with approval status and details
        """
        payload = proposal.to_dict()
        
        if private_key:
            payload["signature"] = proposal.sign(private_key)
        
        response = await self._request(
            method="POST",
            endpoint="/v1/proposals",
            data=payload
        )
        
        return ValidationDecision(
            proposal_id=response["proposal_id"],
            status=DecisionStatus(response["status"]),
            approved=response["approved"],
            transaction_id=response.get("transaction_id"),
            reason=response.get("reason"),
            modifications=response.get("modifications"),
            risk_score=response.get("risk_score", 0.0),
            policy_violations=response.get("policy_violations", []),
            required_actions=response.get("required_actions", []),
            valid_until=response.get("valid_until"),
            metadata=response.get("metadata", {})
        )
    
    async def execute(
        self,
        transaction_id: str,
        idempotency_key: Optional[str] = None
    ) -> ExecutionResult:
        """
        Execute an approved transaction.
        
        Args:
            transaction_id: ID from validated proposal
            idempotency_key: Optional key to prevent duplicate execution
        
        Returns:
            ExecutionResult with transaction details
        """
        headers = {}
        if idempotency_key:
            headers["Idempotency-Key"] = idempotency_key
        
        response = await self._request(
            method="POST",
            endpoint=f"/v1/transactions/{transaction_id}/execute",
            data={}
        )
        
        return ExecutionResult(
            transaction_id=response["transaction_id"],
            success=response["success"],
            tx_hash=response.get("tx_hash"),
            amount=response.get("amount"),
            fee=response.get("fee"),
            timestamp=response.get("timestamp", time.time()),
            error_message=response.get("error_message"),
            confirmations=response.get("confirmations", 0),
            block_number=response.get("block_number")
        )
    
    async def get_agent_status(self) -> AgentStatus:
        """Get current agent status and metrics."""
        response = await self._request(
            method="GET",
            endpoint="/v1/agent/status"
        )
        
        return AgentStatus(
            agent_id=response["agent_id"],
            trust_level=TrustLevel(response["trust_level"]),
            capital_allocated=response["capital_allocated"],
            capital_deployed=response["capital_deployed"],
            unrealized_pnl=response["unrealized_pnl"],
            realized_pnl=response["realized_pnl"],
            active_positions=response["active_positions"],
            pending_proposals=response["pending_proposals"],
            total_transactions=response["total_transactions"],
            success_rate=response["success_rate"],
            last_activity=response["last_activity"],
            risk_metrics=response.get("risk_metrics", {}),
            compliance_status=response.get("compliance_status", "compliant")
        )
    
    async def get_proposal_status(self, proposal_id: str) -> ValidationDecision:
        """Check status of a submitted proposal."""
        response = await self._request(
            method="GET",
            endpoint=f"/v1/proposals/{proposal_id}"
        )
        
        return ValidationDecision(
            proposal_id=response["proposal_id"],
            status=DecisionStatus(response["status"]),
            approved=response["approved"],
            transaction_id=response.get("transaction_id"),
            reason=response.get("reason"),
            modifications=response.get("modifications"),
            risk_score=response.get("risk_score", 0.0),
            policy_violations=response.get("policy_violations", []),
            required_actions=response.get("required_actions", []),
            valid_until=response.get("valid_until"),
            metadata=response.get("metadata", {})
        )
    
    async def list_transactions(
        self,
        limit: int = 50,
        offset: int = 0,
        status: Optional[str] = None,
        start_time: Optional[float] = None,
        end_time: Optional[float] = None
    ) -> List[ExecutionResult]:
        """List historical transactions with filtering."""
        params = {
            "limit": limit,
            "offset": offset
        }
        
        if status:
            params["status"] = status
        if start_time:
            params["start_time"] = start_time
        if end_time:
            params["end_time"] = end_time
        
        response = await self._request(
            method="GET",
            endpoint="/v1/transactions",
            params=params
        )
        
        return [
            ExecutionResult(
                transaction_id=tx["transaction_id"],
                success=tx["success"],
                tx_hash=tx.get("tx_hash"),
                amount=tx.get("amount"),
                fee=tx.get("fee"),
                timestamp=tx.get("timestamp", 0),
                error_message=tx.get("error_message"),
                confirmations=tx.get("confirmations", 0),
                block_number=tx.get("block_number")
            )
            for tx in response.get("transactions", [])
        ]
    
    async def cancel_proposal(self, proposal_id: str) -> bool:
        """Cancel a pending proposal before execution."""
        response = await self._request(
            method="POST",
            endpoint=f"/v1/proposals/{proposal_id}/cancel"
        )
        
        return response.get("success", False)
    
    def on_event(self, event_type: str):
        """
        Decorator to register event handlers.
        
        Usage:
            @client.on_event("proposal.approved")
            async def handle_approval(event):
                print(f"Proposal approved: {event['proposal_id']}")
        """
        def decorator(func):
            if event_type not in self._event_handlers:
                self._event_handlers[event_type] = []
            self._event_handlers[event_type].append(func)
            return func
        return decorator
    
    async def start_event_stream(self):
        """Start listening to real-time events (WebSocket)."""
        # Implementation would use websockets for real-time events
        # This is a placeholder for the actual implementation
        import websockets
        
        ws_url = self.base_url.replace("https://", "wss://") + "/v1/events"
        
        async with websockets.connect(
            ws_url,
            extra_headers={
                "Authorization": f"Bearer {self.api_key}",
                "X-Agent-ID": self.agent_id
            }
        ) as websocket:
            async for message in websocket:
                event = json.loads(message)
                event_type = event.get("type")
                
                if event_type in self._event_handlers:
                    for handler in self._event_handlers[event_type]:
                        await handler(event)
    
    async def close(self):
        """Close the HTTP client."""
        await self._client.aclose()
    
    async def __aenter__(self):
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()


# Convenience functions for common operations

async def quick_validate(
    agent_id: str,
    api_key: str,
    transaction_type: str,
    params: Dict[str, Any],
    rationale: str,
    environment: str = "sandbox"
) -> ValidationDecision:
    """
    Quick one-liner to validate a transaction proposal.
    
    Usage:
        decision = await quick_validate(
            agent_id="my-agent",
            api_key="sk_test_...",
            transaction_type="crypto_swap",
            params={"from": "USDC", "to": "ETH", "amount": 1000},
            rationale="Portfolio rebalancing"
        )
        if decision.approved:
            print("Ready to execute!")
    """
    async with AgentClient(agent_id, api_key, environment) as client:
        proposal = ActionProposal(
            transaction_type=TransactionType(transaction_type),
            params=params,
            rationale=rationale
        )
        return await client.submit_proposal(proposal)


# Example integration with popular AI agent frameworks

class OpenClawIntegration:
    """
    Integration layer for OpenClaw autonomous agents.
    
    Wraps Sentinel SDK to work seamlessly with OpenClaw's action system.
    """
    
    def __init__(self, sentinel_client: AgentClient):
        self.client = sentinel_client
    
    async def propose_action(self, openclaw_action: Any) -> ValidationDecision:
        """Convert OpenClaw action to Sentinel proposal and validate."""
        # Extract action details from OpenClaw format
        action_type = openclaw_action.get("type")
        action_params = openclaw_action.get("params", {})
        rationale = openclaw_action.get("rationale", "Autonomous decision")
        
        # Map to Sentinel transaction type
        transaction_type = self._map_action_type(action_type)
        
        proposal = ActionProposal(
            transaction_type=transaction_type,
            params=action_params,
            rationale=rationale,
            context={"source": "openclaw", "original_action": openclaw_action}
        )
        
        return await self.client.submit_proposal(proposal)
    
    def _map_action_type(self, action_type: str) -> TransactionType:
        """Map OpenClaw action types to Sentinel transaction types."""
        mapping = {
            "swap": TransactionType.CRYPTO_SWAP,
            "transfer": TransactionType.CRYPTO_TRANSFER,
            "stake": TransactionType.DEFI_STAKE,
            "unstake": TransactionType.DEFI_UNSTAKE,
            "lend": TransactionType.DEFI_LEND,
            "borrow": TransactionType.DEFI_BORROW,
            "buy_stock": TransactionType.STOCK_BUY,
            "sell_stock": TransactionType.STOCK_SELL,
            "pay": TransactionType.PAYMENT_SEND,
            "rebalance": TransactionType.REBALANCE_PORTFOLIO
        }
        return mapping.get(action_type, TransactionType.CRYPTO_SWAP)


class LangChainIntegration:
    """
    Integration layer for LangChain agents.
    
    Provides tools that LangChain agents can use to interact with Sentinel.
    """
    
    def __init__(self, sentinel_client: AgentClient):
        self.client = sentinel_client
        self.tools = self._create_tools()
    
    def _create_tools(self):
        """Create LangChain-compatible tools."""
        from langchain.tools import Tool
        
        return [
            Tool(
                name="propose_financial_action",
                func=self._propose_action_sync,
                coroutine=self._propose_action_async,
                description="Propose a financial action for guardrail validation"
            ),
            Tool(
                name="check_agent_status",
                func=self._check_status_sync,
                coroutine=self._check_status_async,
                description="Check current agent trust level and capital allocation"
            ),
            Tool(
                name="execute_approved_transaction",
                func=self._execute_sync,
                coroutine=self._execute_async,
                description="Execute a previously approved transaction"
            )
        ]
    
    async def _propose_action_async(self, action_json: str) -> str:
        """Async version for LangChain."""
        import json
        action_data = json.loads(action_json)
        
        proposal = ActionProposal(
            transaction_type=TransactionType(action_data["type"]),
            params=action_data["params"],
            rationale=action_data.get("rationale", "AI-generated action")
        )
        
        decision = await self.client.submit_proposal(proposal)
        
        return json.dumps({
            "approved": decision.approved,
            "status": decision.status,
            "reason": decision.reason,
            "transaction_id": decision.transaction_id,
            "risk_score": decision.risk_score
        })
    
    def _propose_action_sync(self, action_json: str) -> str:
        """Sync wrapper for async method."""
        return asyncio.run(self._propose_action_async(action_json))
    
    async def _check_status_async(self, _: str = "") -> str:
        """Check agent status."""
        import json
        status = await self.client.get_agent_status()
        
        return json.dumps({
            "trust_level": status.trust_level.value,
            "capital_allocated": status.capital_allocated,
            "capital_deployed": status.capital_deployed,
            "realized_pnl": status.realized_pnl,
            "success_rate": status.success_rate,
            "compliance_status": status.compliance_status
        })
    
    def _check_status_sync(self, _: str = "") -> str:
        """Sync wrapper for async method."""
        return asyncio.run(self._check_status_async())
    
    async def _execute_async(self, transaction_id: str) -> str:
        """Execute approved transaction."""
        import json
        result = await self.client.execute(transaction_id)
        
        return json.dumps({
            "success": result.success,
            "tx_hash": result.tx_hash,
            "amount": result.amount,
            "fee": result.fee
        })
    
    def _execute_sync(self, transaction_id: str) -> str:
        """Sync wrapper for async method."""
        return asyncio.run(self._execute_async(transaction_id))


# CLI interface for testing and debugging

if __name__ == "__main__":
    import argparse
    import sys
    
    parser = argparse.ArgumentParser(description="Sentinel FI CLI")
    parser.add_argument("--agent-id", required=True, help="Agent ID")
    parser.add_argument("--api-key", required=True, help="API key")
    parser.add_argument("--env", default="sandbox", help="Environment")
    parser.add_argument("--action", required=True, help="Action to perform")
    parser.add_argument("--params", type=json.loads, help="Action parameters as JSON")
    
    args = parser.parse_args()
    
    async def main():
        async with AgentClient(args.agent_id, args.api_key, args.env) as client:
            if args.action == "status":
                status = await client.get_agent_status()
                print(f"Trust Level: {status.trust_level.value}")
                print(f"Capital Allocated: ${status.capital_allocated:,.2f}")
                print(f"Capital Deployed: ${status.capital_deployed:,.2f}")
                print(f"Realized P&L: ${status.realized_pnl:,.2f}")
                print(f"Success Rate: {status.success_rate:.2%}")
            
            elif args.action == "propose":
                if not args.params:
                    print("Error: --params required for propose action")
                    sys.exit(1)
                
                proposal = ActionProposal(
                    transaction_type=TransactionType(args.params.get("type")),
                    params=args.params.get("params", {}),
                    rationale=args.params.get("rationale", "CLI proposal")
                )
                
                decision = await client.submit_proposal(proposal)
                print(f"Status: {decision.status}")
                print(f"Approved: {decision.approved}")
                if decision.reason:
                    print(f"Reason: {decision.reason}")
                if decision.transaction_id:
                    print(f"Transaction ID: {decision.transaction_id}")
    
    asyncio.run(main())
