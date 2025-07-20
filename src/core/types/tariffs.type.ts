import { tariffSchema } from "#core/validations/tariffSchema.js";
import { z } from "zod";

export type TariffResponse = z.infer<typeof tariffSchema>;
export type TariffData = TariffResponse["response"]["data"];

export interface TariffPeriod {
  id: number;
  dt_next_box: Date | string | null;
  dt_till_max: Date | string | null;
}
