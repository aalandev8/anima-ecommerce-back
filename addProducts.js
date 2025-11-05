/*
 * Script para agregar categorías y productos sin borrar datos existentes
 *
 * Este script:
 * 1. Se conecta a la base de datos
 * 2. Agrega las categorías primero
 * 3. Luego agrega los productos nuevos sin borrar nada
 * 4. Respeta todos los datos existentes
 *
 * Para ejecutar:
 * 👉 node addProducts.js
 */

require("dotenv").config();
const { sequelize } = require("./models");
const categorySeeder = require("./seeders/categorySeeder");
const productSeeder = require("./seeders/productSeeder");

async function addProducts() {
  console.log("\n🚀 Agregando categorías y productos nuevos...\n");
  console.log("=".repeat(60));

  try {
    // Verificar conexión
    console.log("\n[1/3] Verificando conexión a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa");

    // Insertar categorías primero
    console.log("\n[2/3] Insertando categorías...");

    if (typeof categorySeeder === "function") {
      await categorySeeder();
    } else if (categorySeeder && typeof categorySeeder.up === "function") {
      await categorySeeder.up();
    } else {
      throw new Error("El categorySeeder no exporta una función válida");
    }

    console.log("✅ Categorías agregadas correctamente");

    // Insertar productos
    console.log("\n[3/3] Insertando productos nuevos...");

    if (typeof productSeeder === "function") {
      await productSeeder();
    } else if (productSeeder && typeof productSeeder.up === "function") {
      await productSeeder.up();
    } else {
      throw new Error("El productSeeder no exporta una función válida");
    }

    console.log("✅ Productos agregados correctamente");

    console.log("\n" + "=".repeat(60));
    console.log("\n✅ ¡Categorías y productos agregados exitosamente!\n");
  } catch (error) {
    console.error("\n❌ Error al agregar datos:", error.message);
    console.error("\nStack trace:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexión cerrada.\n");
  }
}

addProducts();
