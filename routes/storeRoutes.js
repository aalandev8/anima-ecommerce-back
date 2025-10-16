// routes/stores.js
const express = require('express');
const router = express.Router();
const { Store, User } = require('../models'); // Ajusta la ruta según tu estructura

// GET /api/tiendas - Obtener todas las tiendas o filtrar por categoría
router.get('/tiendas', async (req, res) => {
  try {
    const { categoria } = req.query;
    
    let whereClause = {};
    
    if (categoria) {
      whereClause.type = categoria;
    }
    
    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'firstname', 'lastname', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    if (categoria && stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron tiendas para la categoría: ${categoria}`
      });
    }
    
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
    
  } catch (error) {
    console.error('Error en GET /api/tiendas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tiendas',
      error: error.message
    });
  }
});

// GET /api/tiendas/destacadas - Obtener tiendas destacadas (puedes agregar este campo al modelo)
router.get('/tiendas/destacadas', async (req, res) => {
  try {
    const stores = await Store.findAll({
      // where: { featured: true }, // Si agregas este campo al modelo
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'firstname', 'lastname', 'email']
        }
      ]
    });
    
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
    
  } catch (error) {
    console.error('Error en GET /api/tiendas/destacadas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener tiendas destacadas',
      error: error.message
    });
  }
});

// GET /api/tiendas/:id - Obtener una tienda por ID
router.get('/tiendas/:id', async (req, res) => {
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
        message: `No se encontró la tienda con ID: ${id}`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: store
    });
    
  } catch (error) {
    console.error('Error en GET /api/tiendas/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la tienda',
      error: error.message
    });
  }
});

// GET /api/tiendas/categoria/:type - Alternativa para obtener por categoría
router.get('/tiendas/categoria/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    const stores = await Store.findAll({
      where: { type },
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'firstname', 'lastname', 'email']
        }
      ],
      order: [['name', 'ASC']]
    });
    
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
    
  } catch (error) {
    console.error('Error en GET /api/tiendas/categoria/:type:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener tiendas por categoría',
      error: error.message
    });
  }
});

module.exports = router;