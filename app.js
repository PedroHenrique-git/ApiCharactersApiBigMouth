import express from 'express';
import path from 'path';
import personagem from './src/routes/personagem';
import home from './src/routes/home';
import foto from './src/routes/foto';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public', 'images')));

app.use('/', home);
app.use('/personagem', personagem);
app.use('/foto', foto);

export default app;
