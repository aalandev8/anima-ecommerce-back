const { Product, Category, Store } = require("../models");

const kosherProducts = require("./product/productKosher");
const veganProducts = require("./product/productVegan");
const glutenFreeProducts = require("./product/productGlutenFree");
const diabeticProducts = require("./product/productDiabetic");
const vegetarianProducts = require("./product/productVegetarian");
const halalProducts = require("./product/productHalal");


module.exports = async () => {
  console.log("Iniciando seeder de Products...");

  try {
    await Product.destroy({ where: {} });
    console.log("🗑️  Existing products cleared");

    
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    
    const stores = await Store.findAll({ order: [["id", "ASC"]] });

    if (stores.length < 34) {
      throw new Error("No hay suficientes tiendas. Ejecuta el storeSeeder primero.");
    }

  
    const products = [
      ...kosherProducts(stores, categoryMap),
      ...veganProducts(stores, categoryMap),
      ...glutenFreeProducts(stores, categoryMap),
      ...diabeticProducts(stores, categoryMap),
      ...vegetarianProducts(stores, categoryMap),
      ...halalProducts(stores, categoryMap),
     
    ];

   
    await Product.bulkCreate(products);
    console.log(`✅ ${products.length} productos insertados correctamente`);
  } catch (error) {
    console.error("❌ Error en el seeder de productos:", error);
  }
};
