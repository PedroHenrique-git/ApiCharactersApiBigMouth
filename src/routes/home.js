import { Router } from 'express';

const route = new Router();

export default route.get('/', (req, res) => {
  res.send({ message: 'Welcome family guy api' });
});
