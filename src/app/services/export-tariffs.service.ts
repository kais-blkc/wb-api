import { CONST_TARIFFS } from "#core/consts/tariffs.consts.js";
import { TariffWarehouse } from "#core/types/warehouse.type.js";
import knex from "#postgres/knex.js";

export async function getSortedTariffs(): Promise<TariffWarehouse[]> {
  return knex(CONST_TARIFFS.TABLE.WAREHOUSE)
    .select("*")
    .orderByRaw(
      "(box_delivery_base + box_delivery_liter + box_storage_base + box_storage_liter) ASC",
    );
}
