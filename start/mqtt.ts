import mqtt from "mqtt";
import io from './socket.js';
import Device from "#models/device";
import DeviceRepository from "../app/repositories/device_repository.js";
import bot from './telegram.js';
import Rpm from "#models/rpm";
import User from "#models/user";
const client = mqtt.connect(`${process.env.MQTT_BROKER_URL}`, {
  clientId: process.env.MQTT_CLIENT_ID,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  connectTimeout: 1000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  caPaths: process.env.MQTT_CA_CERT_PATH
});

let previousValue: any = {};

client.on('connect', async () => {
  console.log('MQTT BROKER CONNECTED!');

  const devices = await Device.all();
  devices.forEach((device) => {
    client.subscribeAsync(`${device.name}/status`)
  })
  client.on('message', async (topic, message) => {
    let parsedMessage = JSON.parse(message.toString());
    // console.log(parsedMessage.sensorDatas);
    // console.log(parsedMessage.dev_info.eth_dev_list[0].Dev_name)

    const activeDevice = await DeviceRepository.getActiveDevices();
    activeDevice.forEach(async (device) => {
      if(device.name == topic.split('/')[0] && parsedMessage.sensorDatas){
        io.emit(`${device.id}/rpm`, { text: parsedMessage.sensorDatas.find((item: any) => item.flag === 'rpm').value });
        io.emit(`${device.id}/temperature`, { text: parsedMessage.sensorDatas.find((item: any) => item.flag === 'temperature').value });
        io.emit(`${device.id}/motor_status`, { text: parsedMessage.sensorDatas.find((item: any) => item.flag === 'motor_status').switcher });
        io.emit(`${device.id}/security_status`, { text: parsedMessage.sensorDatas.find((item: any) => item.flag === 'security_status').switcher });
        
        const latestStatus = await Rpm.query().where('deviceId', device.id).orderBy('createdAt', 'desc').first();
        const user = await User.findByOrFail('name', "Manual");
        if (latestStatus){
        if (parsedMessage.sensorDatas.find((item: any) => item.flag === 'motor_status').switcher != (latestStatus.isActive ? "1" : "0")){
          await Rpm.create({deviceId: device.id, userId: user.id, rpm: parsedMessage.sensorDatas.find((item: any) => item.flag === 'rpm').value, isActive: parsedMessage.sensorDatas.find((item: any) => item.flag === 'motor_status').switcher, isClockwise: true});
        }
        } else {
          await Rpm.create({deviceId: device.id, userId: user.id, rpm: parsedMessage.sensorDatas.find((item: any) => item.flag === 'rpm').value, isActive: parsedMessage.sensorDatas.find((item: any) => item.flag === 'motor_status').switcher, isClockwise: true});
        }
        
      } 
      
    })

    

    // Security
    let security = parsedMessage.sensorDatas.find((item: { flag: string }) => item.flag === "security_status");
    if(security && security.switcher == 0){
      if(!previousValue[topic]){
        try {

        } catch (e) {
          return 
        }
        bot.sendMessage(`${process.env.TELEGRAM_CHAT_ID}`, `Device (${topic}) is opened at ${dateNow()}`);
        previousValue[topic] = parsedMessage;
        return
      }
      let previousSecurity = previousValue[topic].sensorDatas.find((item: { flag: string }) => item.flag === "security_status");
      if(previousSecurity && previousSecurity.switcher == "1"){
        bot.sendMessage(`${process.env.TELEGRAM_CHAT_ID}`, `Device (${topic}) is opened at ${dateNow()}`);
      }
    }



    
    // if(topic.includes('esp32/temperature')){
    //   const activeDevice = await DeviceRepository.getActiveDevices();
    //   activeDevice.forEach((device) => {
    //     if(device.name == topic.split('/')[2]) io.emit(`temperature/${device.id}`, { text: message.toString() });
    //   })
    // }
    previousValue[topic] = parsedMessage;
  })
});

client.on('error', (err) => {
  console.log(`Error connecting to MQTT Broker. Message: ${err}`);
});

const dateNow = () => {
    const now = new Date();

const dateOptions = {
    day: '2-digit',      
    month: 'long',    
    year: 'numeric'   
};

const timeOptions = {
    hour: '2-digit',  
    minute: '2-digit', 
    second: '2-digit',
    hour12: false,      
    timeZone: 'Asia/Jakarta'
};

const formattedDate = now.toLocaleDateString('id-ID', dateOptions);
const formattedTime = now.toLocaleTimeString('id-ID', timeOptions);

return `${formattedDate} ${formattedTime} WIB`;
}

export default client;
