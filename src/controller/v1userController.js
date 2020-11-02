import bcrypt from 'bcryptjs';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import userdb from '../database/v1signupdb';

class User {
   static async signup (req, res) {
       const {
           firstname, lastname, email, site_location, password
       } = req.body;

       const userExist = userdb.users.find((user) => user.email === email);
       if(userExist) {
           return res.status(401).json({
               status: 401,
               error: 'this email already used'
           });
       }

       const  hashedpassword = await bcrypt.hash(password, 8);
       
       const newUser = {
           id: uuidv4(),
           firstname,
           lastname,
           email,
           site_location,
           password: hashedpassword
       }
       userdb.users.push(newUser);
       const token = jwt.sign({id: uuidv4(), }, process.env.SECRET, { expiresIn: '7d'});
       return res.status(201).json({
           status: 201,
           message: 'user created successfully',
           data: {
               token,
               newUser
           }
       });
   }

   static async signin(req, res) {
       const {email, password} = req.body;
       const userExist = userdb.users.find((user) => user.email === email);
       if(userExist) {
           const{
               password: hashedpassword
           } = userExist;

           const compare = await bcrypt.compare(password, hashedpassword);
           if(compare) {
               const token = await jwt.sign({id: uuidv4(), }, process.env.SECRET, {expiresIn: '7d'});
               return res.status(202).json({
                   status: 202,
                   message: 'User successfully logged in',
                   data: {token}
               });
           }
           return res.status(404).json({
               status: 401,
               error: 'incorrect password'
           });
       }
       return res.status(404).json({
           status: 404,
           error: 'email not found'
       })
   }


}

export default User;