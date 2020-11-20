import { Router } from 'express';
import fotoController from '../controllers/Foto';

const route = new Router();

route.post('/', fotoController.create);

export default route;
