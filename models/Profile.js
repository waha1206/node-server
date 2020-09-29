const mongoose = require("mongoose")
// fix (node:12444) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

// Creat Schema
const ProfileSchema = new Schema({
	type:{
		type:String
	},
	describe:{
		type:String
	},
	income:{
		type:String,
		required:true
	},
	expend:{
		type:String,
		required:true
	},
	cash:{
		type:String,
		required:true
	},
	remark:{
		type:String
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports = Profile = mongoose.model("Profiles", ProfileSchema)