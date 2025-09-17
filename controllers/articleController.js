const { Article } = require('../models');
const { Op } = require('sequelize');

async function index(req, res) {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category,
      isVegan,
      isGlutenFree,
      isDiabetic,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    const whereConditions = {};
    
    if (category) {
      whereConditions.category = category;
    }
    
    if (isVegan !== undefined) {
      whereConditions.isVegan = isVegan === 'true';
    }
    
    if (isGlutenFree !== undefined) {
      whereConditions.isGlutenFree = isGlutenFree === 'true';
    }
    
    if (isDiabetic !== undefined) {
      whereConditions.isDiabetic = isDiabetic === 'true';
    }
    
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const articles = await Article.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset: offset,
      order: [[sortBy, sortOrder.toUpperCase()]],
      attributes: [
        'id', 'name', 'description', 'price', 'category',
        'isVegan', 'isGlutenFree', 'isDiabetic', 
        'imageUrl', 'isAvailable', 'stock', 'createdAt'
      ]
    });

    const totalPages = Math.ceil(articles.count / parseInt(limit));

    res.status(200).json({
      success: true,
      data: articles.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: articles.count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los artículos',
      error: error.message
    });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el artículo',
      error: error.message
    });
  }
}

async function store(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      isVegan = false,
      isGlutenFree = false,
      isDiabetic = false,
      imageUrl,
      stock = 0,
      isAvailable = true,
      ingredients,
      nutritionalInfo
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, descripción, precio y categoría son obligatorios'
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio debe ser mayor a 0'
      });
    }

    const validCategories = ['tortas', 'pasteles', 'cupcakes', 'galletas', 'panes', 'postres', 'bebidas'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `La categoría debe ser una de: ${validCategories.join(', ')}`
      });
    }

    const article = await Article.create({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.toLowerCase(),
      isVegan: Boolean(isVegan),
      isGlutenFree: Boolean(isGlutenFree),
      isDiabetic: Boolean(isDiabetic),
      imageUrl,
      stock: parseInt(stock),
      isAvailable: Boolean(isAvailable),
      ingredients: ingredients ? JSON.stringify(ingredients) : null,
      nutritionalInfo: nutritionalInfo ? JSON.stringify(nutritionalInfo) : null
    });

    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente',
      data: article
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear el artículo',
      error: error.message
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      isVegan,
      isGlutenFree,
      isDiabetic,
      imageUrl,
      stock,
      isAvailable,
      ingredients,
      nutritionalInfo
    } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado'
      });
    }

    if (price !== undefined && price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio debe ser mayor a 0'
      });
    }

    if (category) {
      const validCategories = ['tortas', 'pasteles', 'cupcakes', 'galletas', 'panes', 'postres', 'bebidas'];
      if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: `La categoría debe ser una de: ${validCategories.join(', ')}`
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (category !== undefined) updateData.category = category.toLowerCase();
    if (isVegan !== undefined) updateData.isVegan = Boolean(isVegan);
    if (isGlutenFree !== undefined) updateData.isGlutenFree = Boolean(isGlutenFree);
    if (isDiabetic !== undefined) updateData.isDiabetic = Boolean(isDiabetic);
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (isAvailable !== undefined) updateData.isAvailable = Boolean(isAvailable);
    if (ingredients !== undefined) updateData.ingredients = ingredients ? JSON.stringify(ingredients) : null;
    if (nutritionalInfo !== undefined) updateData.nutritionalInfo = nutritionalInfo ? JSON.stringify(nutritionalInfo) : null;

    await article.update(updateData);

    res.status(200).json({
      success: true,
      message: 'Artículo actualizado exitosamente',
      data: article
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar el artículo',
      error: error.message
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado'
      });
    }

    await article.destroy();

    res.status(200).json({
      success: true,
      message: 'Artículo eliminado exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el artículo',
      error: error.message
    });
  }
}

async function getByDietaryRestrictions(req, res) {
  try {
    const { type } = req.params; // 'vegan', 'gluten-free', 'diabetic'
    
    let whereCondition = {};
    
    switch (type) {
      case 'vegan':
        whereCondition.isVegan = true;
        break;
      case 'gluten-free':
        whereCondition.isGlutenFree = true;
        break;
      case 'diabetic':
        whereCondition.isDiabetic = true;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Tipo de restricción no válido. Use: vegan, gluten-free, o diabetic'
        });
    }

    whereCondition.isAvailable = true;

    const articles = await Article.findAll({
      where: whereCondition,
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: articles,
      count: articles.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los artículos',
      error: error.message
    });
  }
}

async function getByCategory(req, res) {
  try {
    const { category } = req.params;

    const articles = await Article.findAll({
      where: {
        category: category.toLowerCase(),
        isAvailable: true
      },
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: articles,
      count: articles.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los artículos por categoría',
      error: error.message
    });
  }
}

async function updateStock(req, res) {
  try {
    const { id } = req.params;
    const { stock, operation = 'set' } = req.body; // operation: 'set', 'add', 'subtract'

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado'
      });
    }

    let newStock;
    switch (operation) {
      case 'set':
        newStock = parseInt(stock);
        break;
      case 'add':
        newStock = article.stock + parseInt(stock);
        break;
      case 'subtract':
        newStock = article.stock - parseInt(stock);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Operación no válida. Use: set, add, o subtract'
        });
    }

    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: 'El stock no puede ser negativo'
      });
    }

    await article.update({ 
      stock: newStock,
      isAvailable: newStock > 0
    });

    res.status(200).json({
      success: true,
      message: 'Stock actualizado exitosamente',
      data: {
        id: article.id,
        name: article.name,
        previousStock: article.stock,
        newStock: newStock,
        isAvailable: newStock > 0
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el stock',
      error: error.message
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getByDietaryRestrictions,
  getByCategory,
  updateStock
};