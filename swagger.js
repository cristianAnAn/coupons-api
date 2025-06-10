const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coupons API',
      version: '1.0.0',
      description: 'Documentación de la API de cupones con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3300',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ['./routes/*.js'], // aquí escanea los comentarios Swagger
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
