const mongoose = require('mongoose');
const usersSchema = require('../schemas/message');

module.exports = mongoose.model('Message', usersSchema);