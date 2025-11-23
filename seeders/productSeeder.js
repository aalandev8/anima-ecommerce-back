const { Product, Category, Store } = require("../models");

const kosherProducts = require("./product/productKosher");
const veganProducts = require("./product/productVegan");
const glutenFreeProducts = require("./product/productGlutenFree");
const diabeticProducts = require("./product/productDiabetic");
const vegetarianProducts = require("./product/productVegetarian");
const halalProducts = require("./product/productHalal");

module.exports = async (skipDelete = false) => {
  console.log("Iniciando seeder de Products...");

  try {
    // Solo borrar si no se pasa skipDelete como true
    if (!skipDelete) {
      await Product.destroy({ where: {} });
      console.log("🗑️  Existing products cleared");
    }

    // Obtener categorías
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    // Obtener tiendas
    const stores = await Store.findAll({ order: [["id", "ASC"]] });

    console.log(`📊 Tiendas encontradas: ${stores.length}`);

    if (stores.length < 24) {
      throw new Error(`No hay suficientes tiendas. Se encontraron ${stores.length}, se necesitan al menos 24.`);
    }

    // Crear array de productos
    const products = [
      ...kosherProducts(stores, categoryMap),
      ...veganProducts(stores, categoryMap),
      ...glutenFreeProducts(stores, categoryMap),
      ...diabeticProducts(stores, categoryMap),
      ...vegetarianProducts(stores, categoryMap),
      ...halalProducts(stores, categoryMap),
    ];

    // Insertar productos
    await Product.bulkCreate(products);
    console.log(`✅ ${products.length} productos insertados correctamente`);
  } catch (error) {
    console.error("❌ Error en el seeder de productos:", error.message);
    throw error;
  }
};