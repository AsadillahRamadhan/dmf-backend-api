import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'devices'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_used').notNullable().defaultTo(false);
      table.uuid('is_used_by');
      table.foreign('is_used_by').references('id').inTable('users');
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('is_used', 'is_used_by');
    })
  }
}