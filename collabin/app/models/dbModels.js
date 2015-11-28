// app/models/dbSchema.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our schema
var inventorySchema = Schema({
	name: String,
	dateCreated: Date,
	dateLastAltered: Date,
	admins: [Schema.Types.ObjectId],
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
	description: String,
	img: { data: Buffer, contentType: String },
	quantity: Number,
	//owner: Schema.Types.ObjectId
	owner: Schema.Types.ObjectId
});

// create models from schema
var inventory = mongoose.model('inventory', inventorySchema);
var user = mongoose.model('user', userSchema);
var item = mongoose.model('item', itemSchema);

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports.inventory = inventory;
module.exports.user = user;
module.exports.item = item;
