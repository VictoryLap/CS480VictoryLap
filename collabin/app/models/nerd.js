// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our schema
var inventorySchema = mongoose.Schema({
	ID: Schema.Types.ObjectId,
	name: String,
	dateCreated: Date,
	dateLastAltered: Date,
	admins: [Schema.Types.ObjectId],
	users: [Schema.Types.ObjectId],
	items: [Schema.Types.ObjectId]
});

var userSchema = mongoose.Schema({
	ID: Schema.Types.ObjectId,
	userName: String,
	dateCreated: Date,
	password: String
});

var itemSchema = mongoose.Schema({
	ID: Schema.Types.ObjectId,
	name: String,
	description: String,
	img: { data: Buffer, contentType: String },
	quantity: Number,
	owner: Schema.Types.ObjectId
});


// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
    name : {type : String, default: ''}
});
