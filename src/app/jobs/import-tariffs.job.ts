import { importTariffsFromApi } from "#app/services/import-tariffs.service.js";

export async function runImportTariffsJob() {
  try {
    await importTariffsFromApi();
    console.log("✅ Tariffs successfully imported/updated");
  } catch (err) {
    console.error("❌ Error importing tariffs:", err);
  }
}
