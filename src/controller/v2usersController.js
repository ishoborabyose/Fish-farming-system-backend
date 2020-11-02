import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db/models';



class UserController {
   static async getUserByEmail (req, res) {
       const user = await User.findOne({where: {email: 'bety'}});
       return res.status(200).json({user});
   }


  static async createUser(req, res) {
    try { 
        const {
            firstName, lastName, email, location, password
        } = req.body;
 
        const userExist = await User.findOne({where: {email}});
        if(userExist) {
            return res.status(409).json({
                status: 409,
                error: 'this email already used'
            });
        }
 
        const  hashedpassword = await bcrypt.hash(password, 8);
        
        const newUser = {
            firstName,
            lastName,
            email,
            location,
            password: hashedpassword
        }
      const user = await User.create(newUser);
      const token = jwt.sign({email}, process.env.SECRET, { expiresIn: '7d'});
        return res.status(201).json({
            message: 'created successfully',
            token,
            user
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong',
            error
        })
    }  
  };

  static async logIn(req, res) {
    const {email, password} = req.body;
    const userExist = await User.findOne({where: {email}});
    if(userExist) {
        const{
            password: hashedpassword
        } = userExist;

        const compare = await bcrypt.compare(password, hashedpassword);
        if(compare) {
            const token = await jwt.sign({email}, process.env.SECRET, {expiresIn: '7d'});
            return res.status(202).json({
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

export default UserController;

