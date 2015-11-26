// app/models/dbSchema.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our schema
var inventorySchema = Schema({
	//ID: Schema.Types.ObjectId,
	ID: {
		type: Schema.Types.ObjectId,
		ref: 'inventory'
	},
	name: String,
	dateCreated: Date,
	dateLastAltered: Date,
	admins: [{
		type: Schema.Types.ObjectId,
		ref: 'user'}],
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'user'}],
	items: [{
		type: Schema.Types.ObjectId,
		ref: 'item'}]
});

var userSchema = Schema({
	//ID: Schema.Types.ObjectId,
	ID: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	userName: String,
	dateCreated: Date,
	password: String
});

var itemSchema = Schema({
	//ID: Schema.Types.ObjectId,
	ID: {
		type: Schema.Types.ObjectId,
		ref: 'item'
	},
	name: String,
	description: String,
	img: { data: Buffer, contentType: String },
	quantity: Number,
	//owner: Schema.Types.ObjectId
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
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
