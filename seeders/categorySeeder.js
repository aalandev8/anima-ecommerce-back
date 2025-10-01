const { Category } = require("../models");

module.exports = async () => {
  console.log("Iniciando seeder de Categories...");
  
  // Clear existing categories first
  await Category.destroy({ where: {} });
  console.log("🗑️  Existing categories cleared");

  const categories = [
    {
      name: "Pasteles",
      description: "Deliciosos pasteles para celebraciones especiales, cumpleaños y eventos"
    },
    {
      name: "Cupcakes",
      description: "Pequeños pasteles individuales perfectos para cualquier ocasión"
    },
    {
      name: "Galletas",
      description: "Galletas artesanales crujientes y suaves en diferentes sabores"
    },
    {
      name: "Panes",
      description: "Panes frescos horneados diariamente con ingredientes de calidad"
    },
    {
      name: "Tartas",
      description: "Tartas gourmet con frutas frescas y cremas especiales"
    },
    {
      name: "Macarons",
      description: "Delicados macarons franceses en variedad de colores y sabores"
    },
    {
      name: "Postres Especiales",
      description: "Postres únicos y creativos para los paladares más exigentes"
    },
    {
      name: "Productos Sin Gluten",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor"
    }
  ];

  try {
    // Eliminar categorías existentes
    await Category.destroy({ where: {} });
    
    // Insertar las nuevas categorías
    await Category.bulkCreate(categories);
    
    console.log("✅ Categories seeder ejecutado correctamente");
  } catch (error) {
    console.error("❌ Error en Categories seeder:", error);
    throw error;
  }
};