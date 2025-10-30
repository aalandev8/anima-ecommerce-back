const { Product, Category, Store } = require("../models");

module.exports = async () => {
  console.log("Iniciando seeder de Products...");

  try {
    await Product.destroy({ where: {} });
    console.log("🗑️  Existing products cleared");

    // Obtener categorías
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    // ⭐ OBTENER LOS IDs REALES DE LAS TIENDAS
    const stores = await Store.findAll({ order: [["id", "ASC"]] });

    if (stores.length < 20) {
      throw new Error("No hay suficientes tiendas. Ejecuta el storeSeeder primero.");
    }

    const products = [
      // KOSHER STORES
      // Tienda 1
      {
        name: "Parrillada Kosher Premium",
        description: "Selección de carnes kosher certificadas a la parrilla",
        price: 55.99,
        stock: 15,
        category_id: categoryMap["Pasteles"],
        store_id: stores[0].id, // ⭐ Usar el ID real
        image_url: "https://example.com/images/parrillada-kosher.jpg",
      },
      {
        name: "Asado de Tira Kosher",
        description: "Asado de tira kosher certificado, jugoso y tierno",
        price: 42.0,
        stock: 20,
        category_id: categoryMap["Pasteles"],
        store_id: stores[0].id, // ⭐ Usar el ID real
        image_url: "https://example.com/images/asado-kosher.jpg",
      },

      // Tienda 2
      {
        name: "Falafel Plate",
        description: "Plato de falafel con hummus, tahini y ensalada fresca",
        price: 28.5,
        stock: 30,
        category_id: categoryMap["Cupcakes"],
        store_id: stores[1].id, // ⭐ stores[1] = segunda tienda
        image_url: "https://example.com/images/falafel-plate.jpg",
      },
      {
        name: "Shawarma de Pollo",
        description: "Shawarma de pollo kosher con vegetales y salsas",
        price: 32.0,
        stock: 25,
        category_id: categoryMap["Cupcakes"],
        store_id: stores[1].id,
        image_url: "https://example.com/images/shawarma.jpg",
      },

      // Tienda 3
      {
        name: "Jalá Tradicional",
        description: "Pan trenzado kosher para Shabbat, horneado fresco",
        price: 18.99,
        stock: 40,
        category_id: categoryMap["Panes"],
        store_id: stores[2].id,
        image_url: "https://example.com/images/jala.jpg",
      },
      {
        name: "Rugelach de Chocolate",
        description: "Pastelitos tradicionales judíos rellenos de chocolate",
        price: 22.5,
        stock: 35,
        category_id: categoryMap["Galletas"],
        store_id: stores[2].id,
        image_url: "https://example.com/images/rugelach.jpg",
      },

      // Tienda 4
      {
        name: "Sushi Roll Salmón",
        description: "Roll de salmón fresco certificado kosher con aguacate",
        price: 38.0,
        stock: 20,
        category_id: categoryMap["Postres Especiales"],
        store_id: stores[3].id,
        image_url: "https://example.com/images/sushi-salmon.jpg",
      },
      {
        name: "Sashimi Mixto",
        description: "Selección de pescados frescos kosher en sashimi",
        price: 45.99,
        stock: 15,
        category_id: categoryMap["Postres Especiales"],
        store_id: stores[3].id,
        image_url: "https://example.com/images/sashimi.jpg",
      },

      // DIABETIC STORES
      {
        name: "Ensalada Power Bowl",
        description: "Bowl nutritivo con quinoa, vegetales y proteína magra",
        price: 24.5,
        stock: 30,
        category_id: categoryMap["Postres Especiales"],
        store_id: stores[4].id,
        image_url: "https://example.com/images/power-bowl.jpg",
      },
      {
        name: "Pollo Grillado con Vegetales",
        description: "Pechuga de pollo a la parrilla con vegetales al vapor",
        price: 28.0,
        stock: 25,
        category_id: categoryMap["Pasteles"],
        store_id: stores[5].id,
        image_url: "https://example.com/images/pollo-grillado.jpg",
      },

      // GLUTEN-FREE STORES
      {
        name: "Brownie Sin Gluten",
        description: "Delicioso brownie libre de gluten con nueces",
        price: 12.5,
        stock: 28,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: stores[8].id,
        image_url: "https://example.com/images/brownie-sin-gluten.jpg",
      },
      {
        name: "Pan Sin Gluten Artesanal",
        description: "Pan artesanal libre de gluten con semillas",
        price: 15.99,
        stock: 20,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: stores[9].id,
        image_url: "https://example.com/images/pan-sin-gluten.jpg",
      },
      {
        name: "Pizza Sin Gluten Margarita",
        description: "Pizza con masa sin gluten, salsa de tomate y mozzarella",
        price: 32.0,
        stock: 18,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: stores[10].id,
        image_url: "https://example.com/images/pizza-sin-gluten.jpg",
      },

      // VEGAN STORES
      {
        name: "Burger Vegana Beyond",
        description: "Hamburguesa plant-based con queso vegano y vegetales",
        price: 28.99,
        stock: 25,
        category_id: categoryMap["Cupcakes"],
        store_id: stores[12].id,
        image_url: "https://example.com/images/burger-vegana.jpg",
      },
      {
        name: "Bowl Vegano Mediterráneo",
        description: "Bowl con falafel, hummus, tabulé y vegetales frescos",
        price: 26.5,
        stock: 30,
        category_id: categoryMap["Postres Especiales"],
        store_id: stores[13].id,
        image_url: "https://example.com/images/bowl-vegano.jpg",
      },
      {
        name: "Pastel de Chocolate Vegano",
        description: "Pastel de chocolate 100% vegetal con ganache",
        price: 35.0,
        stock: 15,
        category_id: categoryMap["Pasteles"],
        store_id: stores[14].id,
        image_url: "https://example.com/images/pastel-chocolate-vegano.jpg",
      },

      // HALAL STORES
      {
        name: "Kebab Halal",
        description: "Kebab de cordero halal con pan árabe y vegetales",
        price: 32.5,
        stock: 22,
        category_id: categoryMap["Cupcakes"],
        store_id: stores[16].id,
        image_url: "https://example.com/images/kebab-halal.jpg",
      },
      {
        name: "Biryani de Pollo",
        description: "Arroz basmati con pollo halal especiado al estilo indio",
        price: 28.0,
        stock: 25,
        category_id: categoryMap["Pasteles"],
        store_id: stores[17].id,
        image_url: "https://example.com/images/biryani.jpg",
      },
      {
        name: "Shawarma Halal Mixto",
        description: "Mix de carnes halal con salsa tahini y ensalada",
        price: 30.0,
        stock: 28,
        category_id: categoryMap["Cupcakes"],
        store_id: stores[18].id,
        image_url: "https://example.com/images/shawarma-halal.jpg",
      },
      {
        name: "Baklava Árabe",
        description: "Postre tradicional árabe con nueces y miel",
        price: 18.5,
        stock: 35,
        category_id: categoryMap["Postres Especiales"],
        store_id: stores[19].id,
        image_url: "https://example.com/images/baklava.jpg",
      },

      // Productos adicionales
      {
        name: "Tarta de Manzana",
        description: "Tarta de manzana casera con canela",
        price: 22.0,
        stock: 20,
        category_id: categoryMap["Tartas"],
        store_id: stores[2].id,
        image_url: "https://example.com/images/tarta-manzana.jpg",
      },
      {
        name: "Macarons Veganos",
        description: "Macarons 100% vegetales en sabores variados",
        price: 24.99,
        stock: 18,
        category_id: categoryMap["Macarons"],
        store_id: stores[14].id,
        image_url: "https://example.com/images/macarons-veganos.jpg",
      },
      {
        name: "Cheesecake Sin Gluten",
        description: "Cheesecake con base libre de gluten y frutos rojos",
        price: 28.5,
        stock: 16,
        category_id: categoryMap["Productos Sin Gluten"],
        store_id: stores[11].id,
        image_url: "https://example.com/images/cheesecake-sin-gluten.jpg",
      },
    ];

    await Product.bulkCreate(products);

    console.log(`✅ ${products.length} productos insertados correctamente`);
  } catch (error) {
    console.error("❌ Error en Products seeder:", error);
    throw error;
  }
};
