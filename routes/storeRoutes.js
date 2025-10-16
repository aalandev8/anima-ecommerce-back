// routes/stores.js
const express = require('express');
const router = express.Router();
const { Store, User } = require('../models');

// GET /api/stores - Get all stores or filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let whereClause = {};
    
    if (category) {
      whereClause.type = category;
    }
    
    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    // if (category && stores.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `No stores found for category: ${category}`
    //   });
    // }
    
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
    
  } catch (error) {
    console.error('Error in GET /api/stores:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching stores',
      error: error.message
    });
  }
});

// GET /api/stores/:id - Get specific store by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const store = await Store.findByPk(id, {
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'firstname', 'lastname', 'email']
        }
      ]
    });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: `Store with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: store
    });
    
  } catch (error) {
    console.error('Error in GET /api/stores/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching store',
      error: error.message
    });
  }
});

module.exports = router;