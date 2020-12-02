import express from 'express';
import path from 'path';
import cors from 'cors';
import personagem from './src/routes/personagem';
import home from './src/routes/home';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public', 'images')));

app.use('/', home);
app.use('/personagem', personagem);

export default app;
