import { inject } from "@adonisjs/core";
import TemperatureRepository from "../repositories/temperature_repository.js";

@inject()
export default class TemperatureService {
    constructor(private temperatureRepository: TemperatureRepository) {}

    public async index(page: number, per_page: number){
        return this.temperatureRepository.getAll(page, per_page);
    }

    async store(deviceId: string, temperature: number){
        return this.temperatureRepository.store(deviceId, temperature);
    }

    async latest(deviceId: string){
        return this.temperatureRepository.getLatest(deviceId);
    }
    async history(deviceId: string){
        return this.temperatureRepository.getHistory(deviceId);
    }

    async show(id: string){
        return this.temperatureRepository.show(id);
    }

    async update(id: string, deviceId: string, temperature: number){
        return this.temperatureRepository.update(id, deviceId, temperature);
    }

    async delete(id: string){
        return this.temperatureRepository.delete(id);
    }
}