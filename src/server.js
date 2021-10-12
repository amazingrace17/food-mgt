import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Swagger/JsDoc related
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Food WP API',
    version: '1.0.0',
    description:
      'This is the backend REST API for Stutern 1.0 Group 4: Food Waste Prevention App.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Group 5 People',
      email: "tf@web.com",
      url: 'https://food-wp.herokuapp.com/',
    },
  },
  servers: [
    {
      url: 'http://localhost:7000',
      description: 'Development server',
    },
    {
      url: 'https://food-wp.herokuapp.com/',
      description: 'Production server',
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Index
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Our Food Management API.',
    description: 'Stutern 1.0 Inter-track Group 5 Project (Backend).',
    contributors: ['Tolulope Arinola', 'Anthony Ayeni'],
    members: {
      uiux: ['Kareem Johnbelieve', 'Assumpta Chukwu', 'Thami Frama'],
      fd: ['Abiodun Hodonu'],
      swe: ['Tolulope Arinola', 'Anthony Ayeni']
    }

  });
});

app.use(router);
// app.use('/api/v1', router);

export default app;
