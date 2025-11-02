
const bcrypt = require("bcrypt");
const { User } = require("../models");

async function createInitialUsers() {
  try {
    const defaultPassword = "1234";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const users = [
      { name: "Micaela", lastname: "Dorado", email: "mica@example.com", password: hashedPassword, role: "admin" },
      { name: "Facundo", lastname: "Duque", email: "facundo@example.com", password: hashedPassword, role: "admin" },
      { name: "Angie", lastname: "Porro", email: "angie@example.com", password: hashedPassword, role: "admin" },
      { name: "Regina", lastname: "Robles", email: "regi@example.com", password: hashedPassword, role: "admin" },
      { name: "Carlota", lastname: "Gonzalez", email: "carlo@example.com", password: hashedPassword, role: "admin" },
    ];

    for (const userData of users) {
      const [user, created] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: userData
      });
      
      if (created) {
        console.log(`  👤 Usuario creado: ${userData.name} (${userData.email})`);
      } else {
        console.log(`  ⚠️ Usuario ya existe: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Error al crear usuarios:", error);
    throw error;
  }
 
}

module.exports = createInitialUsers;