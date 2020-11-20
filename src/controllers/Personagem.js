import db from '../database/connection';

const valida = (name, age, condition, nationality, genre) => {
  const erros = [];

  if (name === '' || condition === '' || nationality === '' || genre === '') {
    erros.push('Nenhum dos campos pode ser vazio');
  }

  if (typeof age !== 'number') {
    erros.push('Idade tem que ser um número');
  }

  return erros;
};

class PersonagemController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const trx = await db.transaction();
    try {
      const personagens = await trx('personagem').whereExists(function () {
        this.select('*').from('personagem');
      });
      console.log(personagens);
      await trx.commit();

      return res.status(200).send({
        personagens,
      });
    } catch (e) {
      await trx.rollback();
      return res.status(400).json({ erro: 'Erro ao listar alunos' });
    }
  }

  async create(req, res) {
    const {
      name, age, condition, nationality, genre,
    } = req.body;

    const erros = valida(name, age, condition, nationality, genre);

    if (erros.length > 0) {
      return res.status(403).json({
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
        return res.status(400).json({ errro: 'Envie um id valido' });
      }

      await trx('personagem').where('id', id).del();
      await trx.commit();
      return res.status(200).json({ message: 'Personagem exluido com sucesso' });
    } catch (e) {
      trx.rollback();
      return res.status(400).json({ erro: 'Personagem não existe' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const {
      name, age, condition, nationality, genre,
    } = req.body;

    const erros = valida(name, age, condition, nationality, genre);

    if (erros.length > 0) {
      return res.status(400).json({
        erros: erros.map((erro) => erro),
      });
    }

    const trx = await db.transaction();

    try {
      const personagem = await trx('personagem').select('name').where('id', id);

      if (!personagem[0]) {
        return res.status(400).json({ errro: 'Envie um id valido' });
      }

      await trx('personagem').where('id', id).update({
        name, age, condition, nationality, genre,
      });
      await trx.commit();
      return res.status(200).json({ message: 'Personagem atualizado com sucesso' });
    } catch (e) {
      trx.rollback();
      return res.status(400).json({ erro: 'Personagem não existe' });
    }
  }
}

export default new PersonagemController();
