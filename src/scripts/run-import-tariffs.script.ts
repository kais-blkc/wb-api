import { runImportTariffsJob } from "#app/jobs/import-tariffs.job.js";

runImportTariffsJob().then(() => process.exit(0));
