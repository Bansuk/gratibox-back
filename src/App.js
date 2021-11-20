import express from 'express';
import cors from 'cors';
import SignUp from './Controllers/SignUp.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', SignUp);

export default app;
