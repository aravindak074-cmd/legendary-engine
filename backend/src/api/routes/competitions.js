const express = require('express');
const router = express.Router();

// Mock competitions database
const competitions = new Map();

// Get all competitions
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    
    let filteredCompetitions = Array.from(competitions.values());
    
    if (status) {
      filteredCompetitions = filteredCompetitions.filter(c => c.status === status);
    }
    
    if (type) {
      filteredCompetitions = filteredCompetitions.filter(c => c.type === type);
    }
    
    res.json({
      count: filteredCompetitions.length,
      competitions: filteredCompetitions
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get competition by ID
router.get('/:id', async (req, res) => {
  try {
    const competition = competitions.get(req.params.id);
    
    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    
    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new competition
router.post('/', async (req, res) => {
  try {
    const { name, description, startDate, endDate, startingCapital, maxParticipants } = req.body;
    
    if (!name || !startDate) {
      return res.status(400).json({ error: 'Name and start date are required' });
    }
    
    const id = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const competition = {
      id,
      name,
      description: description || '',
      type: req.body.type || 'demo',
      status: 'upcoming',
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      startingCapital: startingCapital || 100000,
      maxParticipants: maxParticipants || 100,
      currentParticipants: 0,
      rules: req.body.rules || {},
      prizes: req.body.prizes || [],
      participants: [],
      leaderboard: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    competitions.set(id, competition);
    
    res.status(201).json({
      message: 'Competition created successfully',
      competition
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Join competition
router.post('/:id/join', async (req, res) => {
  try {
    const competition = competitions.get(req.params.id);
    
    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    
    const { agentId, userId } = req.body;
    
    if (!agentId || !userId) {
      return res.status(400).json({ error: 'Agent ID and User ID are required' });
    }
    
    if (competition.currentParticipants >= competition.maxParticipants) {
      return res.status(400).json({ error: 'Competition is full' });
    }
    
    const participant = {
      agentId,
      userId,
      joinedAt: new Date().toISOString(),
      capital: competition.startingCapital,
      currentCapital: competition.startingCapital,
      rank: null
    };
    
    competition.participants.push(participant);
    competition.currentParticipants++;
    competition.updatedAt = new Date().toISOString();
    competitions.set(req.params.id, competition);
    
    res.json({
      message: 'Joined competition successfully',
      participant
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get competition leaderboard
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const competition = competitions.get(req.params.id);
    
    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    
    // Mock leaderboard data
    const leaderboard = competition.participants.map((p, index) => ({
      rank: index + 1,
      agentId: p.agentId,
      userId: p.userId,
      currentCapital: p.currentCapital,
      return: ((p.currentCapital - p.capital) / p.capital) * 100,
      trades: Math.floor(Math.random() * 50),
      winRate: (Math.random() * 40 + 40).toFixed(2)
    })).sort((a, b) => b.return - a.return);
    
    res.json({
      competitionId: competition.id,
      competitionName: competition.name,
      lastUpdated: new Date().toISOString(),
      leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
