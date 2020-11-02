import Joi from 'joi';


const validatesignup = (req, res, next) => {

    const userSchemas = Joi.object({
        firstName: Joi.string().alphanum().min(3).max(15).required(),
        lastName: Joi.string().alphanum().min(3).max(15).required(),
        email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
        location: Joi.string().alphanum().min(3).max(15).required()
    })

    const schema = userSchemas.validate(req.body);
    if(schema.error) {
        const errors  = [];
        for (let i =0; i < schema.error.details.length; i +=1) {
            errors.push(schema.error.details[i].message.split('"').join( ' '));
        }
        if(errors[0].startsWith('password with value')) {
            const message = 'your password must be at least 1 lowercase, 1 uppercase, 1 numeric character, 1 special character and be 8 characters or more  ';
            return res.status(400).json({
                status: 400,
                error: message
            })
        }
        return res.status(400).json({
            status: 400,
            error: errors[0],
        })
    }

    next();
};

export default validatesignup;

