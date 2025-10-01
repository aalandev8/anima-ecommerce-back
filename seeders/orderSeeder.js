const { Order, Product } = require("../models");

module.exports = async () => {
  console.log("Iniciando seeder de Orders...");

  try {
    const products = await Product.findAll({ limit: 10 });
    
    if (products.length < 3) {
      console.log("⚠️  Se necesitan al menos 3 productos para crear órdenes de ejemplo");
      return;
    }

    const orders = [
      {
        items: [
          {
            product_id: products[0].id,
            product_name: products[0].name,
            price: parseFloat(products[0].price),
            quantity: 2
          },
          {
            product_id: products[1].id,
            product_name: products[1].name,
            price: parseFloat(products[1].price),
            quantity: 1
          }
        ],
        total: (parseFloat(products[0].price) * 2) + parseFloat(products[1].price),
        status: "completado"
      },
      {
        items: [
          {
            product_id: products[2].id,
            product_name: products[2].name,
            price: parseFloat(products[2].price),
            quantity: 3
          }
        ],
        total: parseFloat(products[2].price) * 3,
        status: "pendiente"
      },
      {
        items: [
          {
            product_id: products[0].id,
            product_name: products[0].name,
            price: parseFloat(products[0].price),
            quantity: 1
          },
          {
            product_id: products[3].id,
            product_name: products[3].name,
            price: parseFloat(products[3].price),
            quantity: 2
          },
          {
            product_id: products[4].id,
            product_name: products[4].name,
            price: parseFloat(products[4].price),
            quantity: 1
          }
        ],
        total: parseFloat(products[0].price) + (parseFloat(products[3].price) * 2) + parseFloat(products[4].price),
        status: "procesando"
      },
      {
        items: [
          {
            product_id: products[1].id,
            product_name: products[1].name,
            price: parseFloat(products[1].price),
            quantity: 4
          }
        ],
        total: parseFloat(products[1].price) * 4,
        status: "enviado"
      },
      {
        items: [
          {
            product_id: products[5].id,
            product_name: products[5].name,
            price: parseFloat(products[5].price),
            quantity: 1
          },
          {
            product_id: products[6].id,
            product_name: products[6].name,
            price: parseFloat(products[6].price),
            quantity: 2
          }
        ],
        total: parseFloat(products[5].price) + (parseFloat(products[6].price) * 2),
        status: "pendiente"
      },
      {
        items: [
          {
            product_id: products[7].id,
            product_name: products[7].name,
            price: parseFloat(products[7].price),
            quantity: 1
          }
        ],
        total: parseFloat(products[7].price),
        status: "cancelado"
      },
      {
        items: [
          {
            product_id: products[8].id,
            product_name: products[8].name,
            price: parseFloat(products[8].price),
            quantity: 2
          },
          {
            product_id: products[9].id,
            product_name: products[9].name,
            price: parseFloat(products[9].price),
            quantity: 1
          }
        ],
        total: (parseFloat(products[8].price) * 2) + parseFloat(products[9].price),
        status: "completado"
      },
      {
        items: [
          {
            product_id: products[2].id,
            product_name: products[2].name,
            price: parseFloat(products[2].price),
            quantity: 5
          }
        ],
        total: parseFloat(products[2].price) * 5,
        status: "procesando"
      }
    ];

    // Eliminar órdenes existentes
    await Order.destroy({ where: {} });
    
    // Insertar las nuevas órdenes
    await Order.bulkCreate(orders);
    
    console.log("✅ Orders seeder ejecutado correctamente");
  } catch (error) {
    console.error("❌ Error en Orders seeder:", error);
    throw error;
  }
};