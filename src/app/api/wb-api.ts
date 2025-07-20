import { TariffResponse } from "#core/types/tariffs.type.js";
import env from "#core/config/env/env.js";
import axios from "axios";

const date = new Date().toISOString().slice(0, 10);
const WB_API_URL = "https://common-api.wildberries.ru/api/v1/tariffs/box";

export async function fetchTariffs(): Promise<any> {
  const res = await axios.get<TariffResponse>(WB_API_URL, {
    headers: {
      Authorization: `Bearer ${env.WB_TOKEN}`,
    },
    params: {
      date,
    },
  });

  if (res.status !== 200) {
    throw new Error(`WB API error: ${res.status} ${res.statusText}`);
  }

  console.log("WB API response:", res.data);
  return res.data;
}
