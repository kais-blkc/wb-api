import { getSortedTariffs } from "#app/services/export-tariffs.service.js";
import { exportToGoogleSheets } from "#app/services/google-sheets.service.js";

export async function runExportTariffsToSheetsJob() {
  const tariffs = await getSortedTariffs();

  const rows = [
    [
      "ID",
      "Склад",
      "Delivery Base",
      "Delivery Liter",
      "Storage Base",
      "Storage Liter",
      "Delivery and Storage",
    ],
    ...tariffs.map((t) => [
      t.id,
      t.warehouse_name,
      t.box_delivery_base,
      t.box_delivery_liter,
      t.box_storage_base,
      t.box_storage_liter,
      t.box_delivery_and_storage,
    ]),
  ];

  try {
    await exportToGoogleSheets(rows);
    console.log("✅ Tariffs exported to Google Sheets");
  } catch (err) {
    console.error("❌ Error exporting tariffs to Google Sheets:", err);
  }
}
