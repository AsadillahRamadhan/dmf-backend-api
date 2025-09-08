import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'temperatures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique()
      table.uuid('device_id')
      table.float('temperature')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}