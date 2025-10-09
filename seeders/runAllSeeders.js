

require("dotenv").config();

async function runAllSeeders() {
  await require("./userSeeder")();
  await require("./categorySeeder")();
  await require("./productSeeder")();
  await require("./orderSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
