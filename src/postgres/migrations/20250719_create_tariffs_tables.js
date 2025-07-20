import { CONST_TARIFFS } from "#core/consts/tariffs.consts.js";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema.createTable(CONST_TARIFFS.TABLE.PERIOD, (table) => {
    table.increments("id").primary();
    table.date("dt_next_box");
    table.date("dt_till_max");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable(CONST_TARIFFS.TABLE.WAREHOUSE, (table) => {
    table.increments("id").primary();

    table
      // comment for breakline
      .integer("tariff_period_id")
      .unsigned()
      .references("id")
      .inTable("tariff_periods")
      .onDelete("CASCADE");

    table.string("warehouse_name").notNullable();
    table.decimal("box_delivery_base", 10, 2);
    table.decimal("box_delivery_liter", 10, 2);
    table.decimal("box_storage_base", 10, 2);
    table.decimal("box_storage_liter", 10, 2);
    table.decimal("box_delivery_and_storage", 10, 2);
  });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists(CONST_TARIFFS.TABLE.WAREHOUSE);
  await knex.schema.dropTableIfExists(CONST_TARIFFS.TABLE.PERIOD);
}
