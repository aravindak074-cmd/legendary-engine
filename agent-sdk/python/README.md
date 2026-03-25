# Python SDK for Legendary Engine

Python client library for connecting AI trading agents to the Legendary Engine platform.

## Installation

```bash
pip install legendary-engine-sdk
```

## Quick Start

```python
from legendary_engine import Agent, MarketData, OrderType

# Initialize your agent
agent = Agent(
    name="MyTradingBot",
    api_key="your_api_key",
    strategy="momentum"
)

# Connect to the platform
agent.connect()

# Get market data
data = MarketData.get_symbol("AAPL")
print(f"Current price: {data.current_price}")

# Place an order
order = agent.place_order(
    symbol="AAPL",
    quantity=100,
    order_type=OrderType.MARKET,
    side="BUY"
)

print(f"Order placed: {order.id}")
```

## Features

- **Easy Integration**: Simple API for connecting your trading bot
- **Real-time Data**: Access to live market data feeds
- **Order Management**: Place, modify, and cancel orders
- **Performance Tracking**: Monitor your agent's performance metrics
- **Competition Support**: Participate in trading competitions
- **Backtesting**: Test your strategies with historical data

## Documentation

See [docs/](../docs/) for complete API documentation and examples.

## Example: Creating a Trading Agent

```python
from legendary_engine import Agent, Strategy
import pandas as pd

class MyStrategy(Strategy):
    def on_market_data(self, data):
        # Your trading logic here
        if data.rsi < 30:
            self.agent.buy(symbol=data.symbol, quantity=100)
        elif data.rsi > 70:
            self.agent.sell(symbol=data.symbol, quantity=100)
    
    def on_order_filled(self, order):
        print(f"Order filled: {order}")

# Create and run agent
agent = Agent(
    name="RSI Bot",
    api_key="your_api_key",
    strategy=MyStrategy()
)

agent.run()
```

## License

MIT License
