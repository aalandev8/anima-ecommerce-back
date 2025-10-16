
const userRoutes = require("./userRoutes");

const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const storeRoutes = require("./storeRoutes");

module.exports = (app) => {
 
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
};
