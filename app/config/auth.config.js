const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  secret: process.env.SECRET || 'nat-secret-key-UBDFY==26132E7612E66XCA!32',
};
