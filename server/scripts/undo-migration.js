const { exec } = require("child_process");

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("❌ Please provide a migration filename to undo.");
  console.error("Usage: npm run undo-migration -- <migration_filename>");
  process.exit(1);
}

const command = `node node_modules/.bin/sequelize db:migrate:undo --migrations-path src/migrations --config src/config/index.js --env development --name ${migrationName}`;

console.log(`🔄 Undoing migration: ${migrationName}...`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ ${stderr}`);
    return;
  }
  console.log(`✅ Migration ${migrationName} has been undone successfully!`);
});
