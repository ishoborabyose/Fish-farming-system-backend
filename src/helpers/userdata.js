import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config()

  const getId= (token) => {
    const userId = jwt.verify(token,  process.env.SECRET, { expiresIn: '7d'});
    return userId.id;
}

export default getId