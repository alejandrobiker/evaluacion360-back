const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const configureRoutes = require('./routes');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Middleware
app.use(bodyParser.json());

// Rutas
configureRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`); 
});