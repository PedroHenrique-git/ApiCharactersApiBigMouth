import db from '../database/connection';

class PersonagemController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const trx = await db.transaction();

    try {
      const personagens = await trx('personagem')
        .select('id', 'name', 'age', 'condition', 'nationality', 'genre');

      await trx.commit();

      return res.send({
        personagens,
      });
    } catch (e) {
      await trx.rollback();
      return res.send({ erro: 'Erro ao listar alunos' });
    }
  }

  async create(req, res) {
    const {
      name,
      age,
      condition,
      nationality,
      genre,
    } = req.body;

    const erros = [];

    if (name === '' || condition === '' || nationality === '' || genre === '') {
      erros.push('Nenhum dos campos pode ser vazio');
    }

    if (typeof age !== 'number') {
      erros.push('Idade tem que ser um número');
    }

    if (erros.length > 0) {
      return res.send({
        erros: erros.map((erro) => erro),
      });
    }

    const trx = await db.transaction();

    try {
      const personagemInserido = await trx('personagem').insert({
        name,
        age,
        condition,
        nationality,
        genre,
      });

      await trx.commit();

      return res.status(200).send({ message: 'Personagem inserido com sucesso' });
    } catch (e) {
      trx.rollback();

      return res.status(404).send({ erro: e });
    }
  }

  async delete(req, res) {
    res.send(req.body);
  }
}

export default new PersonagemController();
