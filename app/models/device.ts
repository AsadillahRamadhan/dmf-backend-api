import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from './user.js';
import * as relations from '@adonisjs/lucid/types/relations';

export default class Device extends BaseModel {
  @beforeCreate()
  static assignUuid(device: Device){
    device.id = randomUUID();
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare ipAddress: string
  
  @column()
  declare location: string

  @column()
  declare isUsed: boolean

  @column()
  declare isUsedBy: string

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'isUsedBy' })
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}