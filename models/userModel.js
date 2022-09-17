const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const userSchema= new Schema({
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
        enum:["ADMIN","USER"],
        default:"USER"
    }
},
{ timestamps: true }
);

userSchema.plugin(mongoosePaginate) 
const userModel = mongoose.model('user',userSchema);
module.exports = userModel

userModel.findOne(
    { status: { $ne: "DELETE" }, userType: "ADMIN" },
    (userErr, userRes) => {
      if (userErr) {
      } else if (userRes) {
        console.log("Default admin already exist");
      } else {
        let admin = {
          firstName: "Ranjeet",
          lastName: "Singh",
          email: "rskashyap1999@gmail.com",
          mobileNumber: 7618958840,
          password: bcrypt.hashSync("12345678901"),
          userType: "ADMIN",
          otpVerify: true,
        };
        userModel(admin).save((saveErr, saveAdmin) => {
          if (saveErr) {
          } else {
            console.log("Default admin created");
          }
        });
      }
    }
   );
   