const faker = require("@faker-js/faker").fakerES;
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log("[Seeder] Iniciando inserción de usuarios...");
      
    
      const users = [];

      // ✅ Crear 3 usuarios admin primero
      users.push({
        name: "Admin Principal",
        email: "admin@example.com",
        password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      users.push({
        name: "Admin Secundario",
        email: "admin2@example.com",
        password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      users.push({
        name: "Admin Tiendas",
        email: "admin3@example.com",
        password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // ✅ Crear 97 clientes normales
      for (let i = 0; i < 97; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        
        users.push({
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
          role: "client",
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await queryInterface.bulkInsert('users', users);
      console.log(`[Seeder] ✓ ${users.length} usuarios insertados (3 admins, 97 clientes)`);
      
    } catch (error) {
      console.error("[Seeder] ❌ Error insertando usuarios:", error.message);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};