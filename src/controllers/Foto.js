import multer from 'multer';
import multerConfig from '../multer/multer';
import db from '../database/connection';

const upload = multer(multerConfig).single('arquivo');

class FotoController {
  create(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      const trx = await db.transaction();
      try {
        const { originalname, filename } = req.file;
        const { personagem_id } = req.body;
        const foto = await trx('foto').insert({
          originalname, filename, personagem_id,
        });
        await trx.commit();
        return res.status(200).json({ message: 'foto cadastrada' });
      } catch (e) {
        await trx.rollback();
        return res.status(400).json({
          errors: 'Personagem não existe',
        });
      }
    });
  }
}

export default new FotoController();
