import type { ApplicationService } from '@adonisjs/core/types'
import mqtt, { type MqttClient } from 'mqtt'
import env from '#start/env'

// Deklarasikan tipe untuk IoC Container
// declare module '@adonisjs/core/types' {
//   interface ContainerBindings {
//     mqtt: MqttClient
//   }
// }

export default class MqttProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register MqttClient to the container
   */
  register() {
    // this.app.container.singleton('mqtt', () => {
    //   const client = mqtt.connect(env.get('MQTT_BROKER_URL', ''), {
    //     username: env.get('MQTT_USERNAME', ''),
    //     password: env.get('MQTT_PASSWORD', ''),
    //   })
    //   return client
    // })
  }

  /**
   * Setup event listeners after client is registered
   */
  async boot() {
    // const mqttClient = await this.app.container.make('mqtt')

    // mqttClient.on('connect', () => {
    //   console.log('✅ MQTT terhubung ke broker!')
    //   // Subscribe ke topik yang diinginkan saat koneksi berhasil
    //   mqttClient.subscribe('esp32/status', (err) => {
    //     if (!err) {
    //       console.log('✅ Berhasil subscribe ke topik "esp32/status"')
    //     }
    //   })
    // })

    // mqttClient.on('error', (error) => {
    //   console.error('❌ Gagal terhubung ke MQTT:', error)
    // })

    // mqttClient.on('message', (topic, payload) => {
    //   // Tangani pesan masuk di sini
    //   console.log(`📨 Pesan diterima dari topik "${topic}": ${payload.toString()}`)
    // })
  }

  /**
   * Gracefully close the connection
   */
  async shutdown() {
    // const mqttClient = await this.app.container.make('mqtt')
    // mqttClient.end()
    // console.log('🔌 Koneksi MQTT ditutup.')
  }

  async ready(){
    (await import('../start/mqtt.js')).default;
  }
}