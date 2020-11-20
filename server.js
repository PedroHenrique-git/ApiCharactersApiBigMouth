import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Servidor: http://localhost:${process.env.PORT}`);
});
