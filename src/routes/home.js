import { Router } from 'express';

const route = new Router();

export default route.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome family guy api' });
});
