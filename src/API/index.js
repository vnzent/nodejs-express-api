import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import userRoutes from '../routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;

app.use(bodyParser.json());



app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});