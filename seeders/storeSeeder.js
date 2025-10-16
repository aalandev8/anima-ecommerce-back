// seeders/storeSeeder.js
const { Store, User } = require("../models"); // Ajusta la ruta según tu estructura
const {
  kosherStores,
  diabeticStores,
  glutenFreeStores,
  veganStores,
  halalStores
} = require("./stores/index");

module.exports = async function storeSeeder() {
  try {
    console.log("[Seeder] Iniciando inserción de tiendas...");
    
    // Obtener un admin_id válido (puedes ajustar esto según tu lógica)
    const adminUser = await User.findOne({ where: { role: "admin" } });
    
    if (!adminUser) {
      throw new Error("No se encontró un usuario admin. Ejecuta userSeeder primero.");
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
      type: store.category, // Usar directamente la categoría sin mapeo
      admin_id: adminId,
    }));

    // Limpiar la tabla de tiendas existentes
    const deleteCount = await Store.destroy({ where: {}, truncate: true });
    console.log(`[Seeder] ${deleteCount} tiendas eliminadas`);

    // Insertar las nuevas tiendas
    const insertedStores = await Store.bulkCreate(allStores, {
      validate: true,
      returning: true
    });
    
    console.log(`[Seeder] ✓ ${insertedStores.length} tiendas insertadas exitosamente`);

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

    return insertedStores;
  } catch (error) {
    console.error("[Seeder] ❌ Error insertando tiendas:", error.message);
    throw error;
  }
};

// Helper para mapear categorías a los tipos del ENUM
function mapCategoryToType(category) {
  const mapping = {
    'kosher': 'kosher',
    'diabetic': 'organic', // Ajusta según lo que tenga sentido
    'gluten-free': 'celiac',
    'vegan': 'vegan',
    'halal': 'vegetarian' // Ajusta según lo que tenga sentido
  };
  
  return mapping[category] || 'celiac';
}