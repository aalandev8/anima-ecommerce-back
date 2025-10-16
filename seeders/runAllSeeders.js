require("dotenv").config();
const { sequelize } = require("../models"); // Ajustá la ruta si tu carpeta de modelos está en otro lugar
const path = require("path");
const fs = require("fs");

async function runAllSeeders() {
  try {
    console.log("[Database] Conectando a la base de datos...");

    await sequelize.authenticate();
    console.log("[Database] Conexión exitosa ✅\n");

    console.log("[Seeders] Iniciando inserción de datos de prueba...\n");

    // Buscar todos los archivos de seeders
    const seedersDir = path.join(__dirname);
    const seederFiles = fs
      .readdirSync(seedersDir)
      .filter(
        (file) =>
          file.endsWith(".js") &&
          file !== "runAllSeeders.js" // Evitar ejecutar este mismo archivo
      );

    // Ejecutar cada seeder en orden
    for (const file of seederFiles) {
      console.log(`➡️ Ejecutando: ${file}`);
      const seeder = require(path.join(seedersDir, file));

      // Ejecutar el método up de cada seeder
      if (seeder.up) {
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
