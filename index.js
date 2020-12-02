import express from 'express';
import dotenv from 'dotenv';
import userRoute from './src/routes/userRoute';
import db from './src/db/models/index';
import cors from 'cors';

dotenv.config();

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', userRoute);


app.get('/', (req, res) => res.send('server is On'));
app.use((req, res) => {
    res.status(400).send({
        status: 400,
        error: 'Bad Request',
    });
});

// if(!module.parent) {
//     app.listen(port, () => console.log(`listening to port ${port}`))
// }

db.sequelize.sync({ alter: false }).then(() => {
    console.log('Database Connected!');
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  });

export default app;