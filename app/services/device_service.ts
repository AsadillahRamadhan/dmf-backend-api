import { inject } from "@adonisjs/core";
import DeviceRepository from "../repositories/device_repository.js";

@inject()
export default class DeviceService {
    constructor(private deviceRepository: DeviceRepository) {}

    public async index(page: number, per_page: number){
        return this.deviceRepository.getAll(page, per_page);
    }

    async store(name: string, ip_address: string, location: string){
        return this.deviceRepository.store(name, ip_address, location);
    }

    async show(id: string){
        return this.deviceRepository.show(id);
    }

    async useDevice(auth: any, id: string){
        return this.deviceRepository.useDevice(auth, id);
    }

    async getByName(name: string){
        return this.deviceRepository.getByName(name);
    }

    async update(id: string, name: string, ip_address: string, location: string){
        return this.deviceRepository.update(id, name, ip_address, location);
    }

    async delete(id: string){
        return this.deviceRepository.delete(id);
    }
}