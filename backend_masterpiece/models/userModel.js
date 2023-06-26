const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema
const userSchema = new Schema({

    first_Name: {
        type: String,
        required: true
    },

    last_Name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    user_password: {
        type: String,
        required: true
    },
    user_phoneNumber: {
        type: String, 
        // required: true
    },
    // payment:{type:[{}]},
    // user_store:{type: [{perfume_name:String, product_category:String,price:Number,description:String,perfume_picture:String}]},
    user_token: {
        type: String,
        // required: true,
    },
    imageUrl:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }


}, { timestamp: true }
)
userSchema.pre("save", async function () {
    this.user_password = await bcrypt.hash(this.user_password, 10)
})

module.exports = mongoose.model("user", userSchema) 





// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: {
//     type: String, required: true, unique: true, index: true, dropDups: true,
//   },
//   password: { type: String, required: true },
//   isAdmin: { type: Boolean, required: true, default: false },
// });

// const userModel = mongoose.model('User', userSchema);

// module.exports =  userModel;