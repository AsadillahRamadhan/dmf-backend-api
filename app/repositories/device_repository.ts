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

    static async getName(id: string){
        const data = await Device.findOrFail(id);
        return data.name;
    }

    static async getActiveDevices(){
        const data = await Device.query().where('is_used', true);
        return data;
    }

    async useDevice(auth: any, id: string){
        const data = await Device.findOrFail(id);
        // await data.load('user');
        // if(data.isUsed && data.isUsedBy !== auth.user.id){
        //     throw new Error(`Device is already used by ${data.user.name}`)
        // }
        data.isUsed = true;
        data.isUsedBy = auth.user.id;
        await data.save();
        return data;
    }
    
    async getByName(name: string){
        const data = await Device.findBy('name', name);
        if(data == null){
            throw new Error('Device not found!')
        }
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