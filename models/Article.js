const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del artículo no puede estar vacío'
        },
        len: {
          args: [2, 200],
          msg: 'El nombre debe tener entre 2 y 200 caracteres'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La descripción no puede estar vacía'
        },
        len: {
          args: [10, 1000],
          msg: 'La descripción debe tener entre 10 y 1000 caracteres'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'El precio debe ser un número decimal válido'
        },
        min: {
          args: [0.01],
          msg: 'El precio debe ser mayor a 0'
        }
      }
    },
    category: {
      type: DataTypes.ENUM('tortas', 'pasteles', 'cupcakes', 'galletas', 'panes', 'postres', 'bebidas'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La categoría es obligatoria'
        }
      }
    },
    isVegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isGlutenFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isDiabetic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'Debe ser una URL válida'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'El stock debe ser un número entero'
        },
        min: {
          args: [0],
          msg: 'El stock no puede ser negativo'
        }
      }
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Lista de ingredientes en formato JSON'
    },
    nutritionalInfo: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Información nutricional en formato JSON (calorías, proteínas, carbohidratos, etc.)'
    }
  }, {
    tableName: 'articles',
    timestamps: true,
    paranoid: true, // Soft deletes
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['isVegan']
      },
      {
        fields: ['isGlutenFree']
      },
      {
        fields: ['isDiabetic']
      },
      {
        fields: ['isAvailable']
      },
      {
        fields: ['name'],
        name: 'articles_name_search_idx'
      }
    ],
    hooks: {
      beforeSave: (article, options) => {
        // Auto-update availability based on stock
        if (article.stock !== undefined && article.stock <= 0) {
          article.isAvailable = false;
        }
      }
    }
  });

  // Instance methods
  Article.prototype.getDietaryLabels = function() {
    const labels = [];
    if (this.isVegan) labels.push('Vegano');
    if (this.isGlutenFree) labels.push('Sin Gluten');
    if (this.isDiabetic) labels.push('Apto Diabéticos');
    return labels;
  };

  Article.prototype.isInStock = function() {
    return this.stock > 0 && this.isAvailable;
  };

  // Class methods
  Article.findAvailable = function(options = {}) {
    return this.findAll({
      where: {
        isAvailable: true,
        stock: {
          [sequelize.Sequelize.Op.gt]: 0
        },
        ...options.where
      },
      ...options
    });
  };

  Article.findByDietaryRestrictions = function(restrictions = {}) {
    const where = {};
    if (restrictions.vegan) where.isVegan = true;
    if (restrictions.glutenFree) where.isGlutenFree = true;
    if (restrictions.diabetic) where.isDiabetic = true;
    
    return this.findAll({ 
      where,
      order: [['name', 'ASC']]
    });
  };

  return Article;
};