import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
const app = express();

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
