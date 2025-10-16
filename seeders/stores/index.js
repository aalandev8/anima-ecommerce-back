const kosherStores = require('./kosherStores');
const diabeticStores = require('./diabeticStores');
const glutenFreeStores = require('./glutenFreeStores');
const veganStores = require('./veganStores');
const halalStores = require('./halalStores');

// Combinar todas las tiendas
const allStores = [
  ...kosherStores,
  ...diabeticStores,
  ...glutenFreeStores,
  ...veganStores,
  ...halalStores
];

// Función para obtener tiendas por categoría
const getStoresByCategory = (category) => {
  return allStores.filter(store => store.category === category);
};

// Función para obtener todas las tiendas
const getAllStores = () => {
  return allStores;
};

// Función para obtener tienda por ID
const getStoreById = (id) => {
  return allStores.find(store => store.id === parseInt(id));
};

// Función para obtener tiendas destacadas
const getFeaturedStores = () => {
  return allStores.filter(store => store.featured === true);
};

// Función para obtener tiendas destacadas por categoría
const getFeaturedByCategory = (category) => {
  return allStores.filter(store => store.category === category && store.featured === true);
};

module.exports = {
  // Exportar por categoría individual
  kosherStores,
  diabeticStores,
  glutenFreeStores,
  veganStores,
  halalStores,
  // Exportar funciones helper
  allStores,
  getStoresByCategory,
  getAllStores,
  getStoreById,
  getFeaturedStores,
  getFeaturedByCategory
};