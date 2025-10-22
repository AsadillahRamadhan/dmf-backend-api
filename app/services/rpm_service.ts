import { inject } from "@adonisjs/core";
import RpmsRepository from "../repositories/rpm_repository.js";
import client from "#start/mqtt";
import DeviceRepository from "../repositories/device_repository.js";

@inject()
export default class RpmsService {
    constructor(private rpmsRepository: RpmsRepository) {}

    public async index(page: number, per_page: number){
        return this.rpmsRepository.getAll(page, per_page);
    }

    async store(deviceId: string, userId: string, rpm: number, isActive: boolean, isClockwise: boolean){
        const payload = {
            sensorDatas: [
                {
                    sensorId: 1234,
                    switcher: isActive ? 1 : 0,
                    flag: 'motor_status'
                }
            ],
            down: "down"
        }
        const device = await DeviceRepository.getName(deviceId);
        client.publish(`${device}/command`, JSON.stringify(payload));
        await this.rpmsRepository.store(deviceId, userId, rpm, isActive, isClockwise);
    }

    async show(id: string){
        return this.rpmsRepository.show(id);
    }

    async latest(deviceId: string){
        return this.rpmsRepository.getLatest(deviceId);
    }

    async history(deviceId: string){
        return this.rpmsRepository.getHistory(deviceId);
    }

    async update(id: string, deviceId: string, userId: string, rpm: number, isActive: boolean, isClockwise: boolean){
        return this.rpmsRepository.update(id, deviceId, userId, rpm, isActive, isClockwise);
    }

    async delete(id: string){
        return this.rpmsRepository.delete(id);
    }
}