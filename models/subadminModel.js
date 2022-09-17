const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const subAdminSchema= new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    dateOfBirth: {
      type: String
    }, 
    profilePic: {
      type: String
    },
    address: {
        type: String
    },
    otp:{
        type:String
    },
    otpExpireTime:{
        type:Number,
        allowNull: true
    },
    verifyOTP:{
        type:Boolean,
        default:false
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:'address'
      },     
    status:{
        type:String,
        enum:["ACTION","BLOCK","DELETE"],
        default:"ACTION"
    },
    userType:{
        type:String,
        enum:["ADMIN","SUB-ADMIN"],
        default:"SUB-ADMIN"
    }
},
{ timestamps: true }
);

subAdminSchema.plugin(mongoosePaginate) 
const subAdminModel = mongoose.model('subadmin',subAdminSchema);
module.exports = subAdminModel