//Initialize mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Users', new Schema({
	email: String,
    name: String,
    password: String,
    admin: Boolean
}));