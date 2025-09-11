import Temperature from "#models/temperature";

export default class TemperatureRepository {
    public async getAll(page: number, perPage: number){
        const data = await Temperature.query().paginate(page, perPage);
        return data;
    }

    async store(deviceId: string, temperature: number){
        const data = await Temperature.create({deviceId, temperature});
        return data;
    }

    async getLatest(deviceId: string){
        const data = await Temperature.query().where('deviceId', deviceId).orderBy('createdAt', 'desc').first();
        return data;
    }


    async getHistory(deviceId: string){
        const data = await Temperature.query().where('deviceId', deviceId).orderBy('createdAt', 'desc').paginate(1, 10);
        return data;
    }
    
    async show(id: string){
        const data = await Temperature.findOrFail(id);
        return data;
    }

    async update(id: string, deviceId: string, temperature: number){
        const data = await Temperature.findOrFail(id);
        data.merge({deviceId, temperature});
        await data.save();
        return data;
    }

    async delete(id: string){
        (await Temperature.findOrFail(id)).delete();
        return true;
    }
}