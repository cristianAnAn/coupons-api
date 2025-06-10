const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const setupSwagger = require('./swagger');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 👉 REGISTRAR RUTAS
const couponRoutes = require('./routes/couponRoutes');
app.use('/coupons', couponRoutes); // o '/api/coupons'

// 👉 Swagger al final
setupSwagger(app);

// Endpoint raíz opcional
app.get('/', (req, res) => {
  res.send('Coupons API is running');
});

// Sincroniza DB y arranca servidor
sequelize.sync()
  .then(() => {
    console.log('Conectado a SQL Server y sincronizado.');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar la DB:', err));
