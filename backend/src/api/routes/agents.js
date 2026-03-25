const express = require('express');
const router = express.Router();

// Mock agents database
const agents = new Map();

// Get all agents (with filters)
router.get('/', async (req, res) => {
  try {
    const { status, userId, competition } = req.query;
    
    let filteredAgents = Array.from(agents.values());
    
    if (status) {
      filteredAgents = filteredAgents.filter(a => a.status === status);
    }
    
    if (userId) {
      filteredAgents = filteredAgents.filter(a => a.userId === parseInt(userId));
    }
    
    if (competition) {
      filteredAgents = filteredAgents.filter(a => a.competitionId === competition);
    }
    
    res.json({
      count: filteredAgents.length,
      agents: filteredAgents
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get agent by ID
router.get('/:id', async (req, res) => {
  try {
    const agent = agents.get(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new agent
router.post('/', async (req, res) => {
  try {
    const { name, description, strategy, apiKey } = req.body;
    
    if (!name || !strategy) {
      return res.status(400).json({ error: 'Name and strategy are required' });
    }
    
    const id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const agent = {
      id,
      name,
      description: description || '',
      strategy,
      status: 'pending_validation',
      userId: req.body.userId || null,
      competitionId: req.body.competitionId || null,
      apiKey: apiKey || `ak_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
      performance: {
        totalTrades: 0,
        winRate: 0,
        totalReturn: 0,
        sharpeRatio: 0,
        maxDrawdown: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    agents.set(id, agent);
    
    res.status(201).json({
      message: 'Agent created successfully',
      agent: {
        id: agent.id,
        name: agent.name,
        apiKey: agent.apiKey
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update agent
router.put('/:id', async (req, res) => {
  try {
    const agent = agents.get(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    const { name, description, status } = req.body;
    
    if (name) agent.name = name;
    if (description !== undefined) agent.description = description;
    if (status) agent.status = status;
    
    agent.updatedAt = new Date().toISOString();
    agents.set(req.params.id, agent);
    
    res.json({
      message: 'Agent updated successfully',
      agent
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete agent
router.delete('/:id', async (req, res) => {
  try {
    const agent = agents.get(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    agents.delete(req.params.id);
    
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get agent performance metrics
router.get('/:id/performance', async (req, res) => {
  try {
    const agent = agents.get(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    // Mock performance data
    const performance = {
      agentId: agent.id,
      metrics: agent.performance,
      history: [
        { date: '2024-01-01', return: 2.5, trades: 10 },
        { date: '2024-01-02', return: -1.2, trades: 8 },
        { date: '2024-01-03', return: 3.8, trades: 12 }
      ]
    };
    
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Validate agent
router.post('/:id/validate', async (req, res) => {
  try {
    const agent = agents.get(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    // Mock validation logic
    const validationResult = {
      passed: true,
      score: 0.85,
      checks: {
        strategyValid: true,
        riskManagement: true,
        performanceThreshold: true
      }
    };
    
    if (validationResult.passed) {
      agent.status = 'validated';
      agent.validatedAt = new Date().toISOString();
      agent.validationScore = validationResult.score;
      agents.set(req.params.id, agent);
    }
    
    res.json({
      message: 'Validation completed',
      result: validationResult,
      agent
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
