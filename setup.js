/*
 * Script de configuración inicial del proyecto
 *
 * Este script automatiza la configuración completa del proyecto:
 * 1. Verifica la conexión a la base de datos
 * 2. Crea/recrea las tablas
 * 3. Inserta datos de prueba (seeders)
 *
 * Para ejecutar:
 * 👉 npm run setup
 *
 * ADVERTENCIA: Este script eliminará todos los datos existentes en la base de datos.
 */
const bcrypt = require("bcrypt");
require("dotenv").config();
const { sequelize } = require("./models");

// Importar seeders
const categorySeeder = require("./seeders/categorySeeder");
const storeSeeder = require("./seeders/storeSeeder");
const createUsers = require("./seeders/createUsers");
const productSeeder = require("./seeders/productSeeder");

async function runSeeder(seeder, name) {
  if (typeof seeder === 'function') {
    await seeder();
  } else if (seeder && typeof seeder.up === 'function') {
    await seeder.up();
  } else {
    throw new Error(`El seeder ${name} no exporta una función válida`);
  }
}

async function setup() {
  console.log("\n🚀 Iniciando configuración del proyecto...\n");
  console.log("=".repeat(60));

  try {
    // Paso 1: Verificar conexión a la base de datos
    console.log("\n[1/3] Verificando conexión a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos");

    // Paso 2: Crear tablas
    console.log("\n[2/3] Creando tablas de la base de datos...");
    // Desactivar foreign key checks para permitir recrear todas las tablas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log("✅ Tablas creadas correctamente");

    // Paso 3: Insertar datos de prueba
    console.log("\n[3/3] Insertando datos de prueba (seeders)...");

    // Ejecutar seeders en orden (usuarios primero para que stores tenga admin_id)
    await runSeeder(categorySeeder, 'Category');
    console.log("✅ Categorías creadas");

    await runSeeder(createUsers, 'User');
    console.log("✅ Usuarios creados");

    await runSeeder(storeSeeder, 'Store');
    console.log("✅ Tiendas creadas");

    await runSeeder(productSeeder, 'Product');
    console.log("✅ Productos creados");

    console.log("\n" + "=".repeat(60));
    console.log("\n✅ ¡Configuración completada exitosamente!\n");
    console.log("Para iniciar el servidor, ejecuta:");
    console.log("  👉 npm run dev (modo desarrollo)");
    console.log("  👉 npm start (modo producción)\n");
  } catch (error) {
    console.error("\n❌ Error durante la configuración:", error.message);
    console.error("\nStack trace:", error); 
    console.log("\nVerifica que:");
    console.log("  1. Tu archivo .env tenga la configuración correcta de base de datos");
    console.log("  2. El servidor de MySQL esté corriendo");
    console.log("  3. La base de datos especificada en .env exista\n");
    process.exit(1);
  }
  finally {
    await sequelize.close();
    console.log("🔒 Conexión cerrada.\n");
  }
}

setup();
