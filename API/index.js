const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv')
const PORT = process.env.port || 5100;
const router = require('../routes')

app.use(router)
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Hello from the other side");
})

app.listen(PORT, () => {(
    console.log(`Server running on port: http://localhost:${PORT}`))
});