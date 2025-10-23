
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const exampleRoutes = require("./exampleRoutes");
const storeRoutes = require("./storeRoutes");

module.exports = (app) => {
 
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/stores", storeRoutes); // Rutas para Store
};
