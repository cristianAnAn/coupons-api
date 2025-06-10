// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Coupons API is running');
});

// Sincroniza Sequelize
sequelize.sync()
  .then(() => {
    console.log('Conectado a SQL Server y sincronizado.');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar la DB:', err));
