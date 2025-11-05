const { Category } = require("../models");

module.exports = async () => {
  console.log("Iniciando seeder de Categories...");

  // Clear existing categories first
  await Category.destroy({ where: {} });
  console.log("🗑️  Existing categories cleared");

  const categories = [
    {
      name: "Dulces",
      description: "Deliciosos pasteles para celebraciones especiales, cumpleaños y eventos",
    },
    {
      name: "Postres",
      description: "Pequeños pasteles individuales perfectos para cualquier ocasión",
    },
    {
      name: "Brunch",
      description: "Galletas artesanales crujientes y suaves en diferentes sabores",
    },
    {
      name: "Panes",
      description: "Panes frescos horneados diariamente con ingredientes de calidad",
    },
    {
      name: "Entradas",
      description: "Tartas gourmet con frutas frescas y cremas especiales",
    },
    {
      name: "Wraps",
      description: "Delicados macarons franceses en variedad de colores y sabores",
    },
    {
      name: "Sopas",
      description: "Postres únicos y creativos para los paladares más exigentes",
    },
    {
      name: "Pizzas",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Platos principales",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Ensaladas",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Bowls",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Acompañamientos",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Bebidas",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Sushi",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
    {
      name: "Carnes",
      description: "Deliciosas opciones libres de gluten sin comprometer el sabor",
    },
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
