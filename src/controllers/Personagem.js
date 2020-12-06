import dotenv from 'dotenv';
import db from '../database/connection';

dotenv.config();

class PersonagemController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const trx = await db.transaction();

    try {
      let characters = null;
      const results = {};
      const [count] = await trx('personagem').count();
      const { name, limite = 5 } = req.query;
      const totalPages = Math.ceil((count['count(*)']) / Number(limite));

      let { page = 1 } = req.query;

      if (page < 1) page = 1;

      if (name !== undefined) {
        characters = await trx('personagem')
          .select('*')
          .where('name', 'like', `%${name}%`);
      } else {
        characters = await trx('personagem')
          .select('*')
          .limit(Number(limite))
          .offset((page - 1) * Number(limite));
      }

      results.next = `http://localhost:${process.env.PORT}/personagem?page=${Number(page) + 1}`;

      if (Number(page) === totalPages) {
        results.next = null;
      }

      if (page > 1) {
        results.prev = `http://localhost:${process.env.PORT}/personagem?page=${Number(page) - 1}`;
      }

      results.totalItems = count['count(*)'];
      results.totalPages = totalPages;
      results.limit = Number(limite);

      await trx.commit();
      return res.status(200).json({
        info: results, characters,
      });
    } catch (e) {
      await trx.rollback();
      return res.status(400).json({ erro: 'Erro ao listar alunos' });
    }
  }

  async create(req, res) {
    const {
      name, age, condition, occupation, image, genre, information,
    } = req.body;

    const trx = await db.transaction();

    try {
      await trx('personagem').insert({
        name,
        age,
        condition,
        occupation,
        image,
        genre,
        information,
      });

      await trx.commit();

      return res.status(200).json({ message: 'Personagem inserido com sucesso' });
    } catch (e) {
      await trx.rollback();

      return res.status(400).json({ erro: e });
    }
  }

  async delete(req, res) {
    const trx = await db.transaction();

    try {
      const { id } = req.params;

      const personagem = await trx('personagem').select('name').where('id', id);

      if (!personagem[0]) {
        return res.status(400).json({ error: 'Envie um id valido' });
      }

      await trx('personagem').where('id', id).del();
      await trx.commit();
      return res.status(200).json({ message: 'Personagem exluido com sucesso' });
    } catch (e) {
      trx.rollback();
      return res.status(400).json({ error: 'Personagem não existe' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const {
      name, age, condition, occupation, image, genre, information,
    } = req.body;

    const trx = await db.transaction();

    try {
      const personagem = await trx('personagem').select('name').where('id', id);

      if (!personagem[0]) {
        return res.status(400).json({ error: 'Envie um id valido' });
      }

      await trx('personagem').where('id', id).update({
        name, age, condition, occupation, image, genre, information,
      });
      await trx.commit();
      return res.status(200).json({ message: 'Personagem atualizado com sucesso' });
    } catch (e) {
      await trx.rollback();
      return res.status(400).json({ error: 'Personagem não existe' });
    }
  }

  async findOne(req, res) {
    const trx = await db.transaction();
    const { id } = req.params;

    try {
      const personagem = await trx('personagem').select('*').where('id', id);

      if (!personagem[0]) {
        return res.status(400).json({ error: 'Envie um id valido' });
      }

      trx.commit();
      return res.status(200).json({ personagem });
    } catch (e) {
      await trx.rollback();
      return res.status(400).json({ error: 'erro ao encontrar personagem' });
    }
  }
}

export default new PersonagemController();
