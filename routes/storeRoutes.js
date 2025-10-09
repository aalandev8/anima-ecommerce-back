const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Crear una tienda
router.post('/', storeController.createStore);

// Obtener todas las tiendas
router.get('/', storeController.getStores);

// Obtener una tienda por ID
router.get('/:id', storeController.getStoreById);

// Actualizar una tienda por ID
router.put('/:id', storeController.updateStore);

// Eliminar una tienda por ID
router.delete('/:id', storeController.deleteStore);

module.exports = router;

