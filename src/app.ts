import { runTariffSyncCron } from "#app/crons/tarrif-sync.cron.js";
import { migrate, seed } from "#postgres/knex.js";

await migrate.latest();
// await seed.run();

runTariffSyncCron();

console.log("All migrations and seeds have been run");
