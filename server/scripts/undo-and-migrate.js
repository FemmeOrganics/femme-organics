const { execSync } = require("child_process");

const migrations = [
  "20231025193005-create-pickup-mtaani.js",
  "20240806041510-create-transaction.js",
  "20231029135752-create-order-item.js",
  "20231029135611-create-order.js",
  "20231029135610-create-delivery-address.js"
];

const baseCommand = " sequelize db:migrate:undo --migrations-path src/migrations --config src/config/index.js --env development --name";

try {
  // Undo each migration
  migrations.forEach(migration => {
    console.log(`🔄 Undoing migration: ${migration}...`);
    execSync(`${baseCommand} ${migration}`, { stdio: "inherit" });
    console.log(`✅ Successfully undone: ${migration}`);
  });

  // Re-run all migrations
  console.log("🚀 Running all migrations...");
  execSync(" sequelize db:migrate --migrations-path src/migrations --config src/config/index.js --env development", { stdio: "inherit" });
  console.log("✅ Migrations applied successfully!");

} catch (error) {
  console.error("❌ Error during migration process:", error.message);
  process.exit(1);
}
