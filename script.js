require('dotenv').config();

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/dbConnection.js');
const router = require('./routes/routes.js');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());

const corsOption = {
    origin: process.env.ORIGIN_HOST, // Replace with your client app's URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}

app.use(cors(corsOption));

app.use('/api',router);
app.use('/api/images/',express.static('public'));

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(process.env.MAIN_PORT, () => console.log(`Server is running on Port ${process.env.MAIN_PORT}`));