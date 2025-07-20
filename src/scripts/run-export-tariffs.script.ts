import { runExportTariffsToSheetsJob } from "#app/jobs/export-tariffs-sheets.job.js";

runExportTariffsToSheetsJob().then(() => process.exit(0));
