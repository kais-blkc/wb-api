import { google } from "googleapis";
import { JWT } from "google-auth-library";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.cwd(), "google-service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const getSheetsClient = async () => {
  const authClient = (await auth.getClient()) as JWT;
  return google.sheets({ version: "v4", auth: authClient });
};
