const express = require('express');
const router = express.Router();

// Mock marketplace listings
const listings = new Map();

// Get all marketplace listings
router.get('/', async (req, res) => {
  try {
    const { status, category, minScore } = req.query;
    
    let filteredListings = Array.from(listings.values());
    
    if (status) {
      filteredListings = filteredListings.filter(l => l.status === status);
    }
    
    if (category) {
      filteredListings = filteredListings.filter(l => l.category === category);
    }
    
    if (minScore) {
      filteredListings = filteredListings.filter(l => l.validationScore >= parseFloat(minScore));
    }
    
    res.json({
      count: filteredListings.length,
      listings: filteredListings
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = listings.get(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create marketplace listing (for validated agents)
router.post('/', async (req, res) => {
  try {
    const { agentId, name, description, price, category } = req.body;
    
    if (!agentId || !name) {
      return res.status(400).json({ error: 'Agent ID and name are required' });
    }
    
    const id = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const listing = {
      id,
      agentId,
      name,
      description: description || '',
      category: category || 'trading',
      status: 'active',
      price: price || 0,
      pricingModel: price > 0 ? 'subscription' : 'free',
      validationScore: req.body.validationScore || 0.85,
      performance: {
        totalReturn: req.body.totalReturn || 0,
        sharpeRatio: req.body.sharpeRatio || 0,
        winRate: req.body.winRate || 0,
        maxDrawdown: req.body.maxDrawdown || 0
      },
      features: req.body.features || [],
      requirements: req.body.requirements || [],
      downloads: 0,
      rating: {
        average: 0,
        count: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    listings.set(id, listing);
    
    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update listing
router.put('/:id', async (req, res) => {
  try {
    const listing = listings.get(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    const { name, description, price, status } = req.body;
    
    if (name) listing.name = name;
    if (description !== undefined) listing.description = description;
    if (price !== undefined) listing.price = price;
    if (status) listing.status = status;
    
    listing.updatedAt = new Date().toISOString();
    listings.set(req.params.id, listing);
    
    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = listings.get(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    listings.delete(req.params.id);
    
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rate a listing
router.post('/:id/rate', async (req, res) => {
  try {
    const listing = listings.get(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    const { rating, review } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Update average rating
    const totalRatings = listing.rating.count * listing.rating.average;
    listing.rating.count++;
    listing.rating.average = (totalRatings + rating) / listing.rating.count;
    listing.updatedAt = new Date().toISOString();
    
    listings.set(req.params.id, listing);
    
    res.json({
      message: 'Rating submitted successfully',
      rating: listing.rating
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get featured/validated agents
router.get('/featured/validated', async (req, res) => {
  try {
    const validatedListings = Array.from(listings.values())
      .filter(l => l.status === 'active' && l.validationScore >= 0.8)
      .sort((a, b) => b.validationScore - a.validationScore)
      .slice(0, 10);
    
    res.json({
      count: validatedListings.length,
      listings: validatedListings
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
