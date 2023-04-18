const conn = require('./connection');

const select = () => conn.execute(
  'SELECT * FROM TalkerDB.talkers; ',
);

module.exports = {
  select,
};