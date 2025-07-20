import { SHEET_CONFIGS } from "#core/config/google/google-sheets.config.js";
import { getSheetsClient } from "#core/utils/googleAuth.js";

export async function exportToGoogleSheets(data: any[][]) {
  const sheets = await getSheetsClient();

  for (const { sheetId, sheetName } of SHEET_CONFIGS) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: data,
      },
    });
  }
}
