require("dotenv").config();
const { sequelize } = require("../models");
const path = require("path");

async function runAllSeeders() {
  try {
    console.log("[Database] Conectando a la base de datos...");

    await sequelize.authenticate();
    console.log("[Database] Conexión exitosa ✅\n");

    console.log("[Seeders] Iniciando inserción de datos de prueba...\n");

    // CAMBIO: userSeeder PRIMERO, luego storeSeeder
    const seederFiles = [
      "userSeeder.js", // ✅ PRIMERO usuarios (para tener admins)
      "categorySeeder.js", // ✅ SEGUNDO categorías
      "storeSeeder.js", // ✅ TERCERO tiendas (necesita admins)
      "productSeeder.js", // ✅ CUARTO productos (necesita stores y categories)
      "orderSeeder.js",
      "articleSeeder.js",
    ];

    // Ejecutar cada seeder en orden
    for (const file of seederFiles) {
      console.log(`➡️ Ejecutando: ${file}`);
      const seeder = require(path.join(__dirname, file));

      if (typeof seeder === "function") {
        await seeder();
      } else if (seeder.up) {
        await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
      }
    }

    console.log("\n[Database] ✅ Todos los datos de prueba fueron insertados exitosamente.");
  } catch (error) {
    console.error("\n[Database] ❌ Error ejecutando seeders:", error);
  } finally {
    await sequelize.close();
    console.log("[Database] Conexión cerrada");
    process.exit(0);
  }
}

runAllSeeders();
