 import getId from '../helpers/userdata';
import { Sensor} from '../db/models';



class SensorController {

    static async createSensor (req,res) { 

        const  userId =  getId(req.header('token'));

        try {
            const {
                Name, phSensor, oxygenSensor, temperatureSensor
            } = req.query;
            const newSensor = {
               Name, phSensor, oxygenSensor, temperatureSensor, userId
            };
    
          const sensor = await Sensor.create(newSensor);
            return res.status(201).json({
                message: 'created successfully',
                sensor
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'something went wrong',
                error
            });

        }
    }

    static async getAll(req,res){
        try {
            const sensor = await Sensor.findAll();
        return res.status(201).json({
            status:201,
            sensor
        });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message,
            });
        }
        
  }

  static async getOne(req, res){
    const { id } = req.params;
    
    const foundSensor = await Sensor.findOne({where: {id}});
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


export default SensorController;