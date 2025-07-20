import { z } from "zod";

const parseDateOrNull = z.string().transform((val) => {
  const trimmed = val.trim();
  if (!trimmed || val === "") return null;

  const date = new Date(trimmed);
  if (isNaN(date.getTime())) throw new Error(`Invalid date: ${val}`);

  return date;
});

export const warehouseSchema = z.object({
  boxDeliveryAndStorageExpr: z.string(),
  boxDeliveryBase: z.string(),
  boxDeliveryLiter: z.string(),
  boxStorageBase: z.string(),
  boxStorageLiter: z.string(),
  warehouseName: z.string(),
});

export const tariffSchema = z.object({
  response: z.object({
    data: z.object({
      dtNextBox: parseDateOrNull,
      dtTillMax: parseDateOrNull,
      warehouseList: z.array(warehouseSchema),
    }),
  }),
});
