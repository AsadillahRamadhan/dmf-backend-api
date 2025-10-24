import type { HttpContext } from '@adonisjs/core/http'
import { rpmValidator } from '../validators/rpm.js';
import RpmsService from '#services/rpm_service';
import { errors } from '@vinejs/vine';
import { inject } from '@adonisjs/core';
// import client from '#start/mqtt';

@inject()
export default class RpmsController {
    constructor(protected rpmsService: RpmsService) {}
    

    async index({request, response}: HttpContext){
        try {
            const data = await this.rpmsService.index(request.qs().page || 1, request.qs().per_page || 10);
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
            const req = await request.validateUsing(rpmValidator);
            const data = await this.rpmsService.store(req.device_id, req.user_id, req.rpm, req.is_active, req.is_clockwise);
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
            const data = await this.rpmsService.show(id);
            return response.status(200).json({message: "Data found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const req = await request.validateUsing(rpmValidator);
            const data = await this.rpmsService.update(id, req.device_id, req.user_id, req.rpm, req.is_active, req.is_clockwise);
            return response.status(200).json({message: "Data updated!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async latest({request, response}: HttpContext){
        try {
            const device_id = request.param('device_id');
            const data = await this.rpmsService.latest(device_id);
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
            const data = await this.rpmsService.history(device_id);
            if(!data || data.length === 0){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async delete({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.rpmsService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }


}