import { Router } from 'express';
import PersonagemController from '../controllers/Personagem';

const route = new Router();

route.get('/', PersonagemController.index);
route.post('/create', PersonagemController.create);
route.delete('/delete/:id', PersonagemController.delete);

export default route;
