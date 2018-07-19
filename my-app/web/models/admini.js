const mongoose = require('mongoose');
const usersSchema = require('../schemas/admini');

module.exports = mongoose.model('Admini', usersSchema);