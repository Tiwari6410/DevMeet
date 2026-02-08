
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true,
    },lastName : {
        type : String,
    }, age : {
        type : Number,
    },email: {
        type : String,
        unique : true, 
        required : true,
        trim : true,
        
        validate : {
            validator : function (value){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            }
        }
    },password : {
        type : String
    }
})

module.exports = mongoose.model("User", userSchema, "Superman");
