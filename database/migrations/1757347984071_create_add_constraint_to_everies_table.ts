import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.table('temperatures', (table) => {
      table.foreign('device_id').references('id').inTable('devices')
    })
    this.schema.table('rpms', (table) => {
      table.foreign('device_id').references('id').inTable('devices')
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.table('temperatures', (table) => {
      table.dropForeign('device_id')
    })
    this.schema.table('rpms', (table) => {
      table.dropForeign('device_id')
      table.dropForeign('user_id')
    })
  }
}