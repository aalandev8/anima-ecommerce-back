// src/seedUsers.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("../database.js"); // ajusta si tu archivo DB está en otra ruta
const { User } = require("./models"); // ajusta según tu export en src/models/index.js

const users = [
  { nombre: "Mica", apellido: "Apellido", email: "mica@example.com", role: "admin" },
  { nombre: "Juan", apellido: "Apellido", email: "juan@example.com", role: "editor" },
  { nombre: "Sofi", apellido: "Apellido", email: "sofi@example.com", role: "editor" },
  { nombre: "Luis", apellido: "Apellido", email: "luis@example.com", role: "viewer" },
  { nombre: "Ana", apellido: "Apellido", email: "ana@example.com", role: "viewer" },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("DB conectado.");

    // Si querés recrear tablas: await sequelize.sync({ force: true });
    await sequelize.sync(); // no borra tablas si ya existen

    for (const u of users) {
      const found = await User.findOne({ where: { email: u.email } });
      if (found) {
        console.log(`Usuario ya existe: ${u.email}`);
        continue;
      }
      const hashed = await bcrypt.hash("1234", 10);
      const newUser = await User.create({
        nombre: u.nombre,
        apellido: u.apellido,
        email: u.email,
        password: hashed,
        role: u.role,
      });
      console.log("Creado:", newUser.email);
    }

    console.log("Seed finalizado.");
    process.exit(0);
  } catch (err) {
    console.error("Error en seed:", err);
    process.exit(1);
  }
}

seed();
