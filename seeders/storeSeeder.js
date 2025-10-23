const { Store, User } = require("../models");
const {
  kosherStores,
  diabeticStores,
  glutenFreeStores,
  veganStores,
  halalStores
} = require("./stores/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log("[Seeder] Iniciando inserción de tiendas...");
      
     // Obtener un admin_id válido
const adminUser = await User.findOne({ where: { role: "admin" } });

if (!adminUser) {
  console.log("[Seeder] ⚠️  No hay usuarios admin aún, creando usuario admin temporal...");
  
  const tempAdmin = await User.create({
    name: "Admin Temporal",
    email: "temp_admin@example.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    role: "admin"
  });
  
  adminId = tempAdmin.id;
} else {
  adminId = adminUser.id;
}
      
      // Combinar todas las tiendas y agregar admin_id
      const allStores = [
        ...kosherStores,
        ...diabeticStores,
        ...glutenFreeStores,
        ...veganStores,
        ...halalStores
      ].map(store => ({
        name: store.name,
        description: store.description,
        address: store.address,
        phone: store.phone,
        email: store.email,
        image_url: store.image,
        type: store.category,
        admin_id: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      // Limpiar la tabla de tiendas existentes
await queryInterface.bulkDelete('stores', null, {});
console.log(`[Seeder] Tiendas anteriores eliminadas`);
      // Insertar las nuevas tiendas
      await queryInterface.bulkInsert('stores', allStores);
      
      console.log(`[Seeder] ✓ ${allStores.length} tiendas insertadas exitosamente`);

      // Resumen por categoría
      const categoryCounts = {
        kosher: kosherStores.length,
        diabetic: diabeticStores.length,
        "gluten-free": glutenFreeStores.length,
        vegan: veganStores.length,
        halal: halalStores.length
      };

      console.log("[Seeder] Resumen por categoría:");
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`  - ${category}: ${count} tiendas`);
      });

    } catch (error) {
      console.error("[Seeder] ❌ Error insertando tiendas:", error.message);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stores', null, {});
  }
};