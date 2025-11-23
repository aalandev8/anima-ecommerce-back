// seedStoresAndProducts.js
const { Store, Product, sequelize } = require("./models"); // Ajusta la ruta según tu estructura
const storeSeeder = require("./seeders/storeSeeder");
const productSeeder = require("./seeders/productSeeder");

const runSeeders = async () => {
  try {
    console.log("🚀 Iniciando proceso de seeding completo...\n");

    // PASO 1: Limpiar datos existentes
    console.log("🗑️  PASO 1: Limpiando datos existentes");
    console.log("─".repeat(50));

    // Desactivar temporalmente las restricciones de clave foránea
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    console.log("✓ Restricciones de clave foránea desactivadas");

    await Product.destroy({ where: {}, truncate: true, cascade: true });
    console.log("✓ Productos eliminados");

    await Store.destroy({ where: {}, truncate: true, cascade: true });
    console.log("✓ Tiendas eliminadas");

    // Reactivar las restricciones de clave foránea
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✓ Restricciones de clave foránea reactivadas");

    console.log("─".repeat(50));
    console.log("✅ Limpieza completada\n");

    // PASO 2: Ejecutar seeder de tiendas
    console.log("📍 PASO 2: Seeding de Tiendas");
    console.log("─".repeat(50));
    await storeSeeder();
    console.log("─".repeat(50));
    console.log("✅ Tiendas completadas\n");

    // PASO 3: Ejecutar seeder de productos
    console.log("🛒 PASO 3: Seeding de Productos");
    console.log("─".repeat(50));
    await productSeeder(true); // Pasar true para NO borrar productos
    console.log("─".repeat(50));
    console.log("✅ Productos completados\n");

    console.log("🎉 Proceso de seeding completado exitosamente!");
    console.log("═".repeat(50));
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error durante el proceso de seeding:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

// Ejecutar los seeders
runSeeders();
