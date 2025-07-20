import { fetchTariffs } from "#app/api/wb-api.js";
import { CONST_TARIFFS } from "#core/consts/tariffs.consts.js";
import { TariffPeriod } from "#core/types/tariffs.type.js";
import { tariffSchema } from "#core/validations/tariffSchema.js";
import knex from "#postgres/knex.js";

export async function importTariffsFromApi() {
  const rawData = await fetchTariffs();
  const parsed = tariffSchema.parse(rawData);
  const { dtNextBox, dtTillMax, warehouseList } = parsed.response.data;

  // Find or insert tariff period
  const [existing] = await knex<TariffPeriod>(CONST_TARIFFS.TABLE.PERIOD).where(
    {
      dt_next_box: dtNextBox,
      dt_till_max: dtTillMax,
    },
  );

  let tariffPeriodId: number;

  if (existing) {
    tariffPeriodId = existing.id;

    await knex(CONST_TARIFFS.TABLE.WAREHOUSE)
      .where({ tariff_period_id: existing.id })
      .delete();
  } else {
    const [inserted] = await knex<TariffPeriod>(CONST_TARIFFS.TABLE.PERIOD)
      .insert({
        dt_next_box: dtNextBox,
        dt_till_max: dtTillMax,
      })
      .returning("id");

    tariffPeriodId = inserted.id ?? inserted;
  }

  const tariffsToInsert = warehouseList.map((item) => ({
    tariff_period_id: tariffPeriodId,
    warehouse_name: item.warehouseName,
    box_delivery_and_storage: parseFloat(
      item.boxDeliveryAndStorageExpr.replace(",", "."),
    ),
    box_delivery_base: parseFloat(item.boxDeliveryBase.replace(",", ".")),
    box_delivery_liter: parseFloat(item.boxDeliveryLiter.replace(",", ".")),
    box_storage_base: parseFloat(item.boxStorageBase.replace(",", ".")),
    box_storage_liter: parseFloat(item.boxStorageLiter.replace(",", ".")),
  }));

  await knex(CONST_TARIFFS.TABLE.WAREHOUSE).insert(tariffsToInsert);
}
