import { runExportTariffsToSheetsJob } from "#app/jobs/export-tariffs-sheets.job.js";
import { runImportTariffsJob } from "#app/jobs/import-tariffs.job.js";
import cron from "node-cron";

export function runTariffSyncCron() {
  cron.schedule("* * * * *", async () => {
    console.log("⏳ [TARIFF SYNC] Start sync at", new Date().toISOString());

    try {
      await runImportTariffsJob();
      console.log("✅ [TARIFF SYNC] Import done, running export...");

      await runExportTariffsToSheetsJob();
      console.log("✅ [TARIFF SYNC] Export done ");
    } catch (error) {
      console.error("❌ [TARIFF SYNC] Error:", error);
    }
  });
}
