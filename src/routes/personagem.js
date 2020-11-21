import { Router } from 'express';
import PersonagemController from '../controllers/Personagem';

const route = new Router();

route.get('/', PersonagemController.index);
route.post('/', PersonagemController.create);
route.delete('/:id', PersonagemController.delete);
route.put('/:id', PersonagemController.update);
route.get('/:id', PersonagemController.findOne);

export default route;
