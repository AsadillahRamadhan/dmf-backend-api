import Device from "#models/device";

export default class DeviceRepository {
    public async getAll(page: number, perPage: number){
        const data = await Device.query().paginate(page, perPage);
        return data;
    }

    async store(name: string, ipAddress: string, location: string){
        const data = await Device.create({name, ipAddress, location});
        return data;
    }

    async show(id: string){
        const data = await Device.findOrFail(id);
        return data;
    }

    async update(id: string, name: string, ipAddress: string, location: string){
        const data = await Device.findOrFail(id);
        data.merge({name, ipAddress, location});
        await data.save();
        return data;
    }

    async delete(id: string){
        (await Device.findOrFail(id)).delete();
        return true;
    }
}