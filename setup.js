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

require("dotenv").config();
const { sequelize } = require("./models");
const { execSync } = require("child_process");

async function setup() {
  console.log("\n🚀 Iniciando configuración del proyecto...\n");
  console.log("=" .repeat(60));

  try {
    // Paso 1: Verificar conexión a la base de datos
    console.log("\n[1/3] Verificando conexión a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos");

    // Cerrar conexión antes de ejecutar scripts externos
    await sequelize.close();

    // Paso 2: Crear tablas
    console.log("\n[2/3] Creando tablas de la base de datos...");
    execSync("npm run tables", { stdio: "inherit" });

    // Paso 3: Insertar datos de prueba
    console.log("\n[3/3] Insertando datos de prueba (seeders)...");
    execSync("npm run seeders", { stdio: "inherit" });

    console.log("\n" + "=" .repeat(60));
    console.log("\n✅ ¡Configuración completada exitosamente!\n");
    console.log("Para iniciar el servidor, ejecuta:");
    console.log("  👉 npm run dev (modo desarrollo)");
    console.log("  👉 npm start (modo producción)\n");

  } catch (error) {
    console.error("\n❌ Error durante la configuración:", error.message);
    console.log("\nVerifica que:");
    console.log("  1. Tu archivo .env tenga la configuración correcta de base de datos");
    console.log("  2. El servidor de MySQL esté corriendo");
    console.log("  3. La base de datos especificada en .env exista\n");
    process.exit(1);
  }
}

setup();
