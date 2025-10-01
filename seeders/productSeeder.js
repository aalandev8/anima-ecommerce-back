const { Product, Category } = require("../models");

module.exports = async () => {
  console.log("Iniciando seeder de Products...");

  try {
    await Product.destroy({ where: {} });
    console.log("🗑️  Existing products cleared");
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    const products = [
      {
        name: "Pastel de Chocolate Supremo",
        description: "Exquisito pastel de chocolate de 3 capas con ganache de chocolate belga y decoración de fresas frescas",
        price: 45.99,
        stock: 15,
        category_id: categoryMap["Pasteles"],
        image_url: "https://example.com/images/pastel-chocolate-supremo.jpg"
      },
      {
        name: "Pastel de Vainilla Clásico",
        description: "Tradicional pastel de vainilla con crema de mantequilla y decoración elegante",
        price: 38.50,
        stock: 20,
        category_id: categoryMap["Pasteles"],
        image_url: "https://example.com/images/pastel-vainilla-clasico.jpg"
      },
      {
        name: "Pastel Red Velvet",
        description: "Pastel terciopelo rojo con queso crema y un toque de cacao",
        price: 42.00,
        stock: 12,
        category_id: categoryMap["Pasteles"],
        image_url: "https://example.com/images/pastel-red-velvet.jpg"
      },
      {
        name: "Cupcakes de Chocolate (6 unidades)",
        description: "Set de 6 cupcakes de chocolate con frosting de vainilla y decoración colorida",
        price: 18.99,
        stock: 30,
        category_id: categoryMap["Cupcakes"],
        image_url: "https://example.com/images/cupcakes-chocolate.jpg"
      },
      {
        name: "Cupcakes de Limón (12 unidades)",
        description: "Docena de cupcakes de limón con glaseado de limón y ralladura fresca",
        price: 35.00,
        stock: 25,
        category_id: categoryMap["Cupcakes"],
        image_url: "https://example.com/images/cupcakes-limon.jpg"
      },
      {
        name: "Cupcakes Red Velvet (6 unidades)",
        description: "6 cupcakes red velvet con cream cheese frosting y decoración especial",
        price: 22.50,
        stock: 28,
        category_id: categoryMap["Cupcakes"],
        image_url: "https://example.com/images/cupcakes-red-velvet.jpg"
      },
      {
        name: "Galletas de Chocolate Chip (12 unidades)",
        description: "Docena de galletas caseras con chips de chocolate premium",
        price: 12.99,
        stock: 50,
        category_id: categoryMap["Galletas"],
        image_url: "https://example.com/images/galletas-chocolate-chip.jpg"
      },
      {
        name: "Galletas de Avena y Pasas (8 unidades)",
        description: "8 galletas saludables de avena con pasas y un toque de canela",
        price: 10.50,
        stock: 40,
        category_id: categoryMap["Galletas"],
        image_url: "https://example.com/images/galletas-avena-pasas.jpg"
      },
      {
        name: "Galletas Decoradas Temáticas (6 unidades)",
        description: "6 galletas artesanalmente decoradas con glaseado real para ocasiones especiales",
        price: 24.00,
        stock: 20,
        category_id: categoryMap["Galletas"],
        image_url: "https://example.com/images/galletas-decoradas.jpg"
      },
      {
        name: "Pan Artesanal Integral",
        description: "Pan integral horneado diariamente con semillas y granos enteros",
        price: 8.50,
        stock: 35,
        category_id: categoryMap["Panes"],
        image_url: "https://example.com/images/pan-integral.jpg"
      },
      {
        name: "Pan de Centeno",
        description: "Pan tradicional de centeno con corteza crujiente y miga suave",
        price: 9.00,
        stock: 30,
        category_id: categoryMap["Panes"],
        image_url: "https://example.com/images/pan-centeno.jpg"
      },
      {
        name: "Pan Brioche",
        description: "Esponjoso pan brioche francés, perfecto para desayunos especiales",
        price: 12.99,
        stock: 25,
        category_id: categoryMap["Panes"],
        image_url: "https://example.com/images/pan-brioche.jpg"
      },

      {
        name: "Tarta de Frutas del Bosque",
        description: "Tarta con base de masa quebrada, crema pastelera y frutas frescas del bosque",
        price: 32.50,
        stock: 18,
        category_id: categoryMap["Tartas"],
        image_url: "https://example.com/images/tarta-frutas-bosque.jpg"
      },
      {
        name: "Tarta de Manzana Francesa",
        description: "Clásica tarta tatin con manzanas caramelizadas y masa crujiente",
        price: 28.00,
        stock: 22,
        category_id: categoryMap["Tartas"],
        image_url: "https://example.com/images/tarta-manzana-francesa.jpg"
      },
      {
        name: "Tarta de Chocolate y Nueces",
        description: "Intensa tarta de chocolate negro con nueces caramelizadas",
        price: 35.99,
        stock: 15,
        category_id: categoryMap["Tartas"],
        image_url: "https://example.com/images/tarta-chocolate-nueces.jpg"
      },

      // Macarons
      {
        name: "Macarons Clásicos (12 unidades)",
        description: "Docena de macarons en sabores tradicionales: vainilla, chocolate, fresa y pistacho",
        price: 28.50,
        stock: 35,
        category_id: categoryMap["Macarons"],
        image_url: "https://example.com/images/macarons-clasicos.jpg"
      },
      {
        name: "Macarons Premium (6 unidades)",
        description: "6 macarons gourmet con rellenos especiales como lavanda, rosa y té matcha",
        price: 22.00,
        stock: 25,
        category_id: categoryMap["Macarons"],
        image_url: "https://example.com/images/macarons-premium.jpg"
      },

      // Postres Especiales
      {
        name: "Tiramisú Individual",
        description: "Clásico tiramisú italiano con mascarpone, café y cacao en porción individual",
        price: 8.99,
        stock: 40,
        category_id: categoryMap["Postres Especiales"],
        image_url: "https://example.com/images/tiramisu-individual.jpg"
      },
      {
        name: "Cheesecake de Frutos Rojos",
        description: "Cremoso cheesecake con base de galleta y coulis de frutos rojos",
        price: 12.50,
        stock: 30,
        category_id: categoryMap["Postres Especiales"],
        image_url: "https://example.com/images/cheesecake-frutos-rojos.jpg"
      },
      {
        name: "Mousse de Chocolate Belga",
        description: "Suave mousse de chocolate belga con decoración de chocolate blanco",
        price: 9.99,
        stock: 32,
        category_id: categoryMap["Postres Especiales"],
        image_url: "https://example.com/images/mousse-chocolate-belga.jpg"
      },

      // Productos Sin Gluten
      {
        name: "Brownie Sin Gluten",
        description: "Delicioso brownie libre de gluten con nueces, sin comprometer el sabor",
        price: 6.50,
        stock: 28,
        category_id: categoryMap["Productos Sin Gluten"],
        image_url: "https://example.com/images/brownie-sin-gluten.jpg"
      },
      {
        name: "Muffins Sin Gluten (4 unidades)",
        description: "4 muffins de arándanos libres de gluten, perfectos para el desayuno",
        price: 14.99,
        stock: 24,
        category_id: categoryMap["Productos Sin Gluten"],
        image_url: "https://example.com/images/muffins-sin-gluten.jpg"
      },
      {
        name: "Pan Sin Gluten Artesanal",
        description: "Pan artesanal libre de gluten con semillas y granos alternativos",
        price: 11.50,
        stock: 20,
        category_id: categoryMap["Productos Sin Gluten"],
        image_url: "https://example.com/images/pan-sin-gluten.jpg"
      }
    ];

    // Eliminar productos existentes
    await Product.destroy({ where: {} });
    
    // Insertar los nuevos productos
    await Product.bulkCreate(products);
    
    console.log("✅ Products seeder ejecutado correctamente");
  } catch (error) {
    console.error("❌ Error en Products seeder:", error);
    throw error;
  }
};