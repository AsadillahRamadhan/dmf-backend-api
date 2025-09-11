import type { HttpContext } from '@adonisjs/core/http'
import { temperatureValidator } from '../validators/temperature.js';
import TemperatureService from '#services/temperature_service';
import { inject } from '@adonisjs/core';
import { errors } from '@vinejs/vine';

@inject()
export default class TemperatureController {
    constructor(protected temperatureService: TemperatureService) {}

    async index({request, response}: HttpContext){
        try {
            const data = await this.temperatureService.index(request.qs().page || 1, request.qs().per_page || 10);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async latest({request, response}: HttpContext){
        try {
            const device_id = request.param('device_id');
            const data = await this.temperatureService.latest(device_id);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async history({request, response}: HttpContext){
        try {
            const device_id = request.param('device_id');
            const data = await this.temperatureService.history(device_id);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }


    async store({ request, response }: HttpContext) {
        try {
            const req = await request.validateUsing(temperatureValidator);
            const data = await this.temperatureService.store(req.device_id, req.temperature);
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
            const data = await this.temperatureService.show(id);
            return response.status(200).json({message: "Data found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const req = await request.validateUsing(temperatureValidator);
            const data = await this.temperatureService.update(id, req.device_id, req.temperature);
            return response.status(200).json({message: "Data updated!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async delete({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.temperatureService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }


}