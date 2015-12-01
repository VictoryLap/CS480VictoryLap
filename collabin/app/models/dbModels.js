// app/models/dbSchema.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our schema
var inventorySchema = Schema({
	name: String,
	dateCreated: Date,
	dateLastAltered: Date,
	admins: String, //previously admins: [Schema.Types.ObjectId],
	users: [Schema.Types.ObjectId],
	items: [Schema.Types.ObjectId]
});

var userSchema = Schema({
	userName: String,
	firstName: String,
	lastName: String,
	email: String,
	dateCreated: Date,
	password: String,
	img: { data: Buffer, contentType: String }
});

var itemSchema = Schema({
	name: String,
	img: { data: Buffer, contentType: String },
	quantity: Number,
	owner: Schema.Types.ObjectId
});

// create models from schema
var inventory = mongoose.model('inventory', inventorySchema);
var user = mongoose.model('user', userSchema);
var item = mongoose.model('item', itemSchema);

//Authentication Purposes
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bycrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports.inventory = inventory;
module.exports.user = user;
module.exports.item = item;
