import { warehouseSchema } from "#core/validations/tariffSchema.js";
import { z } from "zod";

export type WarehouseTariff = z.input<typeof warehouseSchema>;

export interface TariffWarehouse {
  id: number;
  tariff_period_id: number;
  warehouse_name: string;
  box_delivery_and_storage: number;
  box_delivery_base: number;
  box_delivery_liter: number;
  box_storage_base: number;
  box_storage_liter: number;
}
