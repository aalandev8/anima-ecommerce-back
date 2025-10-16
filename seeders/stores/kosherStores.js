const kosherStores = [
  {
    id: 1,
    name: "Kosher Delight",
    description: "Auténtica comida kosher certificada por el rabinato. Especialidades en carne y parrilla.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    category: "kosher",
    rating: 4.8,
    deliveryTime: "35-45 min",
    deliveryFee: 0,
    featured: true,
    tags: ["Carne", "Parrilla", "Certificado"],
    address: "Pocitos, Av. Rivera 3845, Montevideo",
    phone: "+598 2712 4567",
    email: "info@kosherdelight.com.uy"
  },
  {
    id: 2,
    name: "Jerusalem Flavors",
    description: "Comida israelí tradicional. Falafel, shawarma y hummus frescos todos los días.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    category: "kosher",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 150,
    featured: false,
    tags: ["Israelí", "Mediterráneo", "Vegetariano"],
    address: "Punta Carretas, Ellauri 567, Montevideo",
    phone: "+598 2710 8901",
    email: "pedidos@jerusalemflavors.com.uy"
  },
  {
    id: 3,
    name: "Shabbat Kitchen",
    description: "Especialidades para Shabbat y festividades. Jalá fresca horneada diariamente.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    category: "kosher",
    rating: 4.9,
    deliveryTime: "40-50 min",
    deliveryFee: 200,
    featured: true,
    tags: ["Panadería", "Tradicional", "Shabbat"],
    address: "Villa Muñoz, Av. 8 de Octubre 2234, Montevideo",
    phone: "+598 2481 3456",
    email: "contacto@shabbatkitchen.com.uy"
  },
  {
    id: 4,
    name: "Kosher Sushi Bar",
    description: "Sushi kosher premium con pescado fresco certificado. Rolls creativos y tradicionales.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    category: "kosher",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 0,
    featured: false,
    tags: ["Sushi", "Japonés", "Premium"],
    address: "Carrasco, Av. Arocena 1678, Montevideo",
    phone: "+598 2600 7890",
    email: "reservas@koshersushi.com.uy"
  }
];

module.exports = kosherStores;