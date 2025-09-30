import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'devices'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['is_used_by']);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}