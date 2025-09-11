import type { HttpContext } from '@adonisjs/core/http'
import { deviceValidator } from '../validators/device.js';
import DeviceService from '#services/device_service';
import { inject } from '@adonisjs/core';
import { errors } from '@vinejs/vine';

@inject()
export default class DevicesController {
    constructor(protected deviceService: DeviceService) {}

    async index({request, response}: HttpContext){
        try {
            const data = await this.deviceService.index(request.qs().page || 1, request.qs().per_page || 10);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }


    public async store({ request, response }: HttpContext) {
        try {
            const req = await request.validateUsing(deviceValidator);
            const data = await this.deviceService.store(req.name, req.ip_address, req.location);
            return response.status(201).json({message: "Data created!", data, success: true});
        } catch (e){
            if (e instanceof errors.E_VALIDATION_ERROR) {
                return response.status(400).json({message: e.messages, success: false});
            }
            return response.status(500).json({message: e.message, success: false});
        }
    }

     async show({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const data = await this.deviceService.show(id);
            return response.status(200).json({message: "Data found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const req = await request.validateUsing(deviceValidator);
            const data = await this.deviceService.update(id, req.name, req.ip_address, req.location);
            return response.status(200).json({message: "Data updated!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async delete({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.deviceService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }


}