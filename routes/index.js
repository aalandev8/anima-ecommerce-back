/*
 * No hay una única forma de organizar las rutas de un sitio web.
 * Una alternativa podría ser organizar las rutas por recurso (o entidad):
 */

const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const authRoutes = require("./authRoutes");
const exampleRoutes = require("./exampleRoutes");

module.exports = (app) => {
  /*
   * Al construir una API REST, la convención es que las rutas relativas a
   * un recurso (o entidad) tengan como prefijo el nombre de dicho recurso
   * en inglés y en plural.
   *
   * Ejemplo:
   * Las rutas relativas a los usuarios se agrupan bajo la URL `/users`
   * (en inglés y en plural). Del mismo modo, las rutas relativas a los artículos
   * se deberían agrupar bajo la URL `/articles` (en inglés y en plural).
   */

  // Rutas de autenticación
  app.use("/api/auth", authRoutes);

  // Rutas de recursos
  app.use("/api/users", userRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);

  // Rutas de ejemplo
  app.use("/api/examples", exampleRoutes);
};
