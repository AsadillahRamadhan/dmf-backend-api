import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rpms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique()
      table.uuid('device_id')
      table.uuid('user_id')
      table.integer('rpm')
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_clockwise').defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}