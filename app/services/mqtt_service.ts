// import type { HttpContext } from '@adonisjs/core/http'
import { MqttClient } from 'mqtt';

export default class MqttService {
    constructor(protected mqttClient: MqttClient){}

    public async publish(){
        this.mqttClient.publish('esp32/perintah', "ini perintah dari backend");
        return
    }
}