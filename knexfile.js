const path = require('path');
const dotenv = require('dotenv');
const { attachPaginate } = require('knex-paginate');

attachPaginate();

dotenv.config();

module.exports = {
  client: 'mysql',
  connection: {
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
