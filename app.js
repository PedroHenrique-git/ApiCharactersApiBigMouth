import express from 'express';
import personagem from './src/routes/personagem';
import home from './src/routes/home';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', home);
app.use('/personagem', personagem);

export default app;
