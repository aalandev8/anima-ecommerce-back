const { Store, User } = require("../models");
const {
  kosherStores,
  diabeticStores,
  glutenFreeStores,
  veganStores,
  halalStores
} = require("./stores/index");

module.exports = async () => {
  console.log("Iniciando seeder de Stores...");

  try {
    // Limpiar tiendas existentes
    await Store.destroy({ where: {} });
    console.log("🗑️  Existing stores cleared");

    // Obtener un admin_id válido
    const adminUser = await User.findOne({ where: { role: "admin" } });

    if (!adminUser) {
      throw new Error("No hay usuarios admin. Por favor ejecuta el seeder de usuarios primero.");
    }

    const adminId = adminUser.id;

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
      admin_id: adminId
    }));

    // Insertar las nuevas tiendas
    await Store.bulkCreate(allStores);

    console.log(`✅ ${allStores.length} tiendas insertadas exitosamente`);

    // Resumen por categoría
    const categoryCounts = {
      kosher: kosherStores.length,
      diabetic: diabeticStores.length,
      "gluten-free": glutenFreeStores.length,
      vegan: veganStores.length,
      halal: halalStores.length
    };

    console.log("📊 Resumen por categoría:");
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} tiendas`);
    });

  } catch (error) {
    console.error("❌ Error en Stores seeder:", error);
    throw error;
  }
};