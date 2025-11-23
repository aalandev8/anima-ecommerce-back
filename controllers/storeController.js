const { Store } = require('../models'); // Asegúrate de que Sequelize se haya configurado correctamente

// Crear una nueva tienda
exports.createStore = async (req, res) => {
  try {
    const { name, description, deliveryTime, deliveryFee, rating, address, phone, email, image_url, type, admin_id } = req.body;

    // Validación básica de parámetros
    if (!name || !address || !admin_id) {
      return res.status(400).json({ message: "Nombre, dirección y admin_id son obligatorios." });
    }

    // Crear la tienda en la base de datos
    const store = await Store.create({ 
      name,
      description,
      deliveryTime,
      deliveryFee,
      rating,
      address,
      phone,
      email,
      image_url,
      type,
      admin_id
    });

    res.status(201).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tienda', error: error.message });
  }
};

// Obtener todas las tiendas
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: ['admin', 'products'], // Relaciona admin y productos
    });
    res.status(200).json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tiendas', error: error.message });
  }
};

// Obtener una tienda por ID
exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id, {
      include: ['admin', 'products'],
    });

    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    res.status(200).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la tienda', error: error.message });
  }
};

// Actualizar una tienda por ID
exports.updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, description, deliveryTime, deliveryFee, rating, address, phone, email, image_url, type, admin_id } = req.body;

  try {
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    // Actualizar tienda
    store.name = name || store.name;
    store.description = description || store.description;
    store.deliveryTime = deliveryTime || store.deliveryTime;
    store.deliveryFee = deliveryFee || store.deliveryFee;
    store.rating = rating || store.rating;
    store.address = address || store.address;
    store.phone = phone || store.phone;
    store.email = email || store.email;
    store.image_url = image_url || store.image_url;
    store.type = type || store.type;
    store.admin_id = admin_id || store.admin_id;

    await store.save(); // Guardamos los cambios en la base de datos
    res.status(200).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tienda', error: error.message });
  }
};

// Eliminar una tienda por ID
exports.deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    await store.destroy(); // Eliminar la tienda
    res.status(200).json({ message: 'Tienda eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la tienda', error: error.message });
  }
};
