/*
 * Este archivo se encarga de crear todas las tablas del sistema.
 *
 * En caso de que las tablas ya existían, se eliminan y se crean
 * nuevamente.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node createDatabaseTables.js
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run tables
 */

require("dotenv").config();
const db = require("./models");

async function createDatabaseTables() {
  try {
    console.log("[Database] Conectando a la base de datos...");
    await db.sequelize.authenticate();
    console.log("[Database] Conexión exitosa ✅\n");


    console.log("[Database] Desactivando restricciones de claves foráneas...");
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

   
    console.log("[Database] Eliminando tablas existentes...");
    await db.sequelize.drop();


    console.log("[Database] Reactivando restricciones de claves foráneas...");
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");


    console.log("[Database] Creando nuevas tablas...");
    await db.sequelize.sync({ force: false });

    console.log("\n[Database] ✅ ¡Las tablas fueron creadas exitosamente!");
  } catch (error) {
    console.error("\n[Database] ❌ Error creando tablas:", error);
    process.exit(1);
  } finally {
    await db.sequelize.close();
    process.exit(0);
  }
}

createDatabaseTables();
