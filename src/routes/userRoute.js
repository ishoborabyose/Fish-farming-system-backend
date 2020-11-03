import express from 'express';
import validatesignup from '../middleware/validateSignup';
import validatesignin from '../middleware/validateSignin';
import user from '../controller/v1userController';
import sensor from '../controller/v1sensorsController';
import usersTestDb from '../controller/v2usersController';
import sensor2 from '../controller/v2sensorsController';

const router = express.Router();

router.post('/signin/v1', validatesignin, user.signin);
router.post('/signup/v1', validatesignup, user.signup);
router.get('/fuck/v2',  usersTestDb.getUserByEmail);
router.post('/user/v2', validatesignup, usersTestDb.createUser);
router.post('/login/v2', validatesignin, usersTestDb.logIn);
router.post('/sensor/v1',sensor.createSensor);
router.get('/sensor/v2', sensor2.createSensor);
router.get('/sensor/v1/:id', sensor.getOne);
router.get('/sensor/v2/:id',sensor2.getOne);
router.get('/sensor/v1', sensor.getAll);
router.get('/sensors/v2', sensor2.getAll);


export default router;