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
      // KOSHER STORES (1-4)
      // Kosher Delight (ID: 1) - Carne y Parrilla
      {
        name: "Parrillada Kosher Premium",
        description: "Selección de carnes kosher certificadas a la parrilla",
        price: 55.99,
        stock: 15,
        category_id: categoryMap["Pasteles"],
        store_id: 1,
        image_url: "https://example.com/images/parrillada-kosher.jpg"
      },
      {
        name: "Asado de Tira Kosher",
        description: "Asado de tira kosher certificado, jugoso y tierno",
        price: 42.00,
        stock: 20,
        category_id: categoryMap["Pasteles"],
        store_id: 1,
        image_url: "https://example.com/images/asado-kosher.jpg"
      },

      // Jerusalem Flavors (ID: 2) - Israelí/Mediterráneo
      {
        name: "Falafel Plate",
        description: "Plato de falafel con hummus, tahini y ensalada fresca",
        price: 28.50,
        stock: 30,
        category_id: categoryMap["Cupcakes"],
        store_id: 2,
        image_url: "https://example.com/images/falafel-plate.jpg"
      },
      {
        name: "Shawarma de Pollo",
        description: "Shawarma de pollo kosher con vegetales y salsas",
        price: 32.00,
        stock: 25,
        category_id: categoryMap["Cupcakes"],
        store_id: 2,
        image_url: "https://example.com/images/shawarma.jpg"
      },

      // Shabbat Kitchen (ID: 3) - Panadería/Tradicional
      {
        name: "Jalá Tradicional",
        description: "Pan trenzado kosher para Shabbat, horneado fresco",
        price: 18.99,
        stock: 40,
        category_id: categoryMap["Panes"],
        store_id: 3,
        image_url: "https://example.com/images/jala.jpg"
      },
      {
        name: "Rugelach de Chocolate",
        description: "Pastelitos tradicionales judíos rellenos de chocolate",
        price: 22.50,
        stock: 35,
        category_id: categoryMap["Galletas"],
        store_id: 3,
        image_url: "https://example.com/images/rugelach.jpg"
      },

      // Kosher Sushi Bar (ID: 4) - Sushi
      {
        name: "Sushi Roll Salmón",
        description: "Roll de salmón fresco certificado kosher con aguacate",
        price: 38.00,
        stock: 20,
        category_id: categoryMap["Postres Especiales"],
        store_id: 4,
        image_url: "https://example.com/images/sushi-salmon.jpg"
      },
      {
        name: "Sashimi Mixto",
        description: "Selección de pescados frescos kosher en sashimi",
        price: 45.99,
        stock: 15,
        category_id: categoryMap["Postres Especiales"],
        store_id: 4,
        image_url: "https://example.com/images/sashimi.jpg"
      },

      // DIABETIC STORES (5-8)
      {
        name: "Ensalada Power Bowl",
        description: "Bowl nutritivo con quinoa, vegetales y proteína magra",
        price: 24.50,
        stock: 30,
        category_id: categoryMap["Postres Especiales"],
        store_id: 5,
        image_url: "https://example.com/images/power-bowl.jpg"
      },
      {
        name: "Pollo Grillado con Vegetales",
        description: "Pechuga de pollo a la parrilla con vegetales al vapor",
        price: 28.00,
        stock: 25,
        category_id: categoryMap["Pasteles"],
        store_id: 6,
        image_url: "https://example.com/images/pollo-grillado.jpg"
      },

      // GLUTEN-FREE STORES (9-12)
      {
        name: "Brownie Sin Gluten",
        description: "Delicioso brownie libre de gluten con nueces",
        price: 12.50,
        stock: 28,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: 9,
        image_url: "https://example.com/images/brownie-sin-gluten.jpg"
      },
      {
        name: "Pan Sin Gluten Artesanal",
        description: "Pan artesanal libre de gluten con semillas",
        price: 15.99,
        stock: 20,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: 10,
        image_url: "https://example.com/images/pan-sin-gluten.jpg"
      },
      {
        name: "Pizza Sin Gluten Margarita",
        description: "Pizza con masa sin gluten, salsa de tomate y mozzarella",
        price: 32.00,
        stock: 18,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: 11,
        image_url: "https://example.com/images/pizza-sin-gluten.jpg"
      },

      // VEGAN STORES (13-16)
      {
        name: "Burger Vegana Beyond",
        description: "Hamburguesa plant-based con queso vegano y vegetales",
        price: 28.99,
        stock: 25,
        category_id: categoryMap["Cupcakes"],
        store_id: 13,
        image_url: "https://example.com/images/burger-vegana.jpg"
      },
      {
        name: "Bowl Vegano Mediterráneo",
        description: "Bowl con falafel, hummus, tabulé y vegetales frescos",
        price: 26.50,
        stock: 30,
        category_id: categoryMap["Postres Especiales"],
        store_id: 14,
        image_url: "https://example.com/images/bowl-vegano.jpg"
      },
      {
        name: "Pastel de Chocolate Vegano",
        description: "Pastel de chocolate 100% vegetal con ganache",
        price: 35.00,
        stock: 15,
        category_id: categoryMap["Pasteles"],
        store_id: 15,
        image_url: "https://example.com/images/pastel-chocolate-vegano.jpg"
      },

      // HALAL STORES (17-20)
      {
        name: "Kebab Halal",
        description: "Kebab de cordero halal con pan árabe y vegetales",
        price: 32.50,
        stock: 22,
        category_id: categoryMap["Cupcakes"],
        store_id: 17,
        image_url: "https://example.com/images/kebab-halal.jpg"
      },
      {
        name: "Biryani de Pollo",
        description: "Arroz basmati con pollo halal especiado al estilo indio",
        price: 28.00,
        stock: 25,
        category_id: categoryMap["Pasteles"],
        store_id: 18,
        image_url: "https://example.com/images/biryani.jpg"
      },
      {
        name: "Shawarma Halal Mixto",
        description: "Mix de carnes halal con salsa tahini y ensalada",
        price: 30.00,
        stock: 28,
        category_id: categoryMap["Cupcakes"],
        store_id: 19,
        image_url: "https://example.com/images/shawarma-halal.jpg"
      },
      {
        name: "Baklava Árabe",
        description: "Postre tradicional árabe con nueces y miel",
        price: 18.50,
        stock: 35,
        category_id: categoryMap["Postres Especiales"],
        store_id: 20,
        image_url: "https://example.com/images/baklava.jpg"
      },

      // Productos adicionales distribuidos
      {
        name: "Tarta de Manzana",
        description: "Tarta de manzana casera con canela",
        price: 22.00,
        stock: 20,
        category_id: categoryMap["Tartas"],
        store_id: 3,
        image_url: "https://example.com/images/tarta-manzana.jpg"
      },
      {
        name: "Macarons Veganos",
        description: "Macarons 100% vegetales en sabores variados",
        price: 24.99,
        stock: 18,
        category_id: categoryMap["Macarons"],
        store_id: 15,
        image_url: "https://example.com/images/macarons-veganos.jpg"
      },
      {
        name: "Cheesecake Sin Gluten",
        description: "Cheesecake con base libre de gluten y frutos rojos",
        price: 28.50,
        stock: 16,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: 12,
        image_url: "https://example.com/images/cheesecake-sin-gluten.jpg"
      }
    ];

    await Product.bulkCreate(products);
    
    console.log(`✅ ${products.length} productos insertados correctamente`);
    console.log("📊 Distribución por tienda:");
    
    // Contar productos por tienda
    const storeCounts = {};
    products.forEach(p => {
      storeCounts[p.store_id] = (storeCounts[p.store_id] || 0) + 1;
    });
    
    Object.entries(storeCounts).forEach(([storeId, count]) => {
      console.log(`  - Tienda ${storeId}: ${count} productos`);
    });
    
  } catch (error) {
    console.error("❌ Error en Products seeder:", error);
    throw error;
  }
};