import Rpm from "#models/rpm";

export default class RpmsRepository {
    public async getAll(page: number, perPage: number){
        const data = await Rpm.query().paginate(page, perPage);
        return data;
    }

    async store(deviceId: string, userId: string, rpm: number, isActive: boolean, isClockwise: boolean){
        const data = await Rpm.create({deviceId, userId, rpm, isActive, isClockwise});
        return data;
    }

    async show(id: string){
        const data = await Rpm.findOrFail(id);
        return data;
    }

    async getHistory(deviceId: string){
        const data = await Rpm.query().where('deviceId', deviceId).orderBy('createdAt', 'desc').preload('user').paginate(1, 10);
        return data;
    }

    async getLatest(deviceId: string){
        const data = await Rpm.query().where('deviceId', deviceId).orderBy('createdAt', 'desc').first();
        return data;
    }

    async update(id: string, deviceId: string, userId: string, rpm: number, isActive: boolean, isClockwise: boolean){
        const data = await Rpm.findOrFail(id);
        data.merge({deviceId, userId, rpm, isActive, isClockwise});
        await data.save();
        return data;
    }

    async delete(id: string){
        (await Rpm.findOrFail(id)).delete();
        return true;
    }
}