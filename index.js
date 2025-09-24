import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 5100;

app.use(bodyParser.json());

app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send("Hello from the other side");
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));