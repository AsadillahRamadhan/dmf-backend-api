import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from './user.js';
import * as relations from '@adonisjs/lucid/types/relations';

export default class Rpm extends BaseModel {
  @beforeCreate()
  static assignUuid(rpm: Rpm){
    rpm.id = randomUUID();
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare deviceId: string

  @column()
  declare userId: string

  @column()
  declare rpm: number

  @column()
  declare isActive: boolean

  @column()
  declare isClockwise: boolean

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}