// routes/stores.js
const express = require('express');
const router = express.Router();
const { Store, User, Product, Category } = require('../models');

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
          attributes: ['id', 'name', 'email']
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


router.get('/:storeId/products', async (req, res) => {
  try {
    const { storeId } = req.params;
    
    // Verificar que la tienda existe
    const store = await Store.findByPk(storeId);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: `Store with ID ${storeId} not found`
      });
    }
    
    // Traer productos de esa tienda
    const products = await Product.findAll({
      where: { store_id: storeId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ],
      order: [['name', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
    
  } catch (error) {
    console.error('Error in GET /api/stores/:storeId/products:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching store products',
      error: error.message
    });
  }
});

module.exports = router;