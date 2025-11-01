
const bcrypt = require("bcrypt");
require("dotenv").config();
const sequelize = require("../database");
const { User } = require("../models");

async function createInitialUsers() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos.");

    const users = [
      { name: "Micaela", lastname: "Dorado", email: "mica@example.com", password: "1234", role: "admin" },
      { name: "Facundo", lastname: "Duque", email: "facundo@example.com", password: "1234", role: "admin" },
      { name: "Angie", lastname: "Porro", email: "angie@example.com", password: "1234", role: "admin" },
      { name: "Regina", lastname: "Robles", email: "regi@example.com", password: "1234", role: "admin" },
      { name: "Carlota", lastname: "Gonzalez", email: "carlo@example.com", password: "1234", role: "admin" },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        });
        console.log(`👤 Usuario creado: ${userData.name} (${userData.email})`);
      } else {
        console.log(`⚠️ Usuario ya existe: ${userData.email}`);
      }
    }

    console.log("🎉 Usuarios iniciales creados correctamente.");
  } catch (error) {
    console.error("❌ Error al crear usuarios:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexión cerrada.");
  }
}

createInitialUsers();
