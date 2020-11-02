
import { v4 as uuidv4 } from 'uuid';
import sensordb from '../database/v1sensorsdb';
import getId from '../helpers/userdata';


class Sensor {
    static  createSensor(req,res) {
       const  userId =  getId(req.header('token'));
      
        const { name,ph_sensor, oxygen_sensor,temperature_sensor } = req.body;
        const newSensor = {
            id: uuidv4(),
            name,
            ph_sensor,
            oxygen_sensor,
            temperature_sensor,
            userId
        }
        sensordb.sensors.push(newSensor)
       
            return res.status(201).json({
                status: 201,
                message: 'Sensor created successfully',
                data: {
                    newSensor
                },
            });
       
    }
      

    static getAll(req,res){
        
          return res.status(200).json({
            status: 200,
            data: sensordb ,
          });
    }


    static getOne(req, res) {
        const { id } = req.params;
    
        const foundSensor = sensordb.sensors.find((element) => element.id === id);
        if(!foundSensor) {
            return res.status(404).json({
                status:404,
                error: 'Sensor  not found'
            });

        }
        return res.status(200).json({
            status: 200,
            data: {
                foundSensor,
            }
        })
      
    }


}

export default Sensor