const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Creat Schema
const UserSchema = new Schema({
	name:{
		type:String,
		required:[true, "使用者名稱必填"]
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports = User = mongoose.model("users", UserSchema)