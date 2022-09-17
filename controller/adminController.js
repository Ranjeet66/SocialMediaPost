const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const commonFunction = require('../helper/commonFunction');

module.exports =
{
    adminOtpVerify:async (req,res)=>
    {
        try 
        {
           let resultVerify =await userModel.findOne({$and:[{$or:[{email:req.body.email}]},{status:{$ne:"DELETE"}},{userType:'ADMIN'}],},)
                     if(!resultVerify){
                       return res.send({reponseCode:404,responseMessage:'Admin not found',responseResult:[]},);
                    } else {
                        if (resultVerify.otpVerify == true) {
                            return res.send({ responseCode: 409, responseMessage: 'Admin already verified.', responseResult: resultVerify })
                            }
                        else{ 
                            let currentTime =Date.now();
                            if(req.body.otp==resultVerify.otp){
                                if(resultVerify.otpExpireTime>=currentTime){
                              let resVerify = await userModel.findByIdAndUpdate({_id:resultVerify._id},{$set:{otpVerify: true}},{new:true},)
                                        if (resVerify) {
                                            return res.send({reponseCode:200,responseMessage:'Admin verify successfully',result:[]},);
                                        }
                            }else{
                                    res.send({reponseCode:410,responseMessage:'OTP is Expired',result:[]},);
                                   }
                            }else{
                                res.send({reponseCode:400,responseMessage:'Wrong OTP',result:[]},);
                            }

                      }
                    }
        } catch (er) 
        {
           return res.send({reponseCode:501,responseMessage:'Something went worng',result:er.message})
       }
    },
    adminResendOtp:async(req,res)=>{
        try {
            let query ={$and:[{email:req.body.email},{status:{$ne:"DELETE"}},{userType:"ADMIN"}],}; 
            let adminResult = await userModel.findOne(query);
            if (!adminResult) {
                return res.send({reponseCode:404,responseMessage:'Admin not found .',responseResult:[],});
            } else {
                if(adminResult.otpVerify==true){
                    return res.send({reponseCode:401,responseMessage:'Admin already verified',responseResult:[]},);
                }else{
                let otp = commonFunction.otp();
                let expireTime = Date.now()+5*60*1000;
                let subject = 'OTP for verify';
                let text = `${otp}`;
                let mailResult = await  commonFunction.sendMail(adminResult.email,subject,text);
                if(mailResult){
                    let updateAdmin = await userModel.findByIdAndUpdate({_id:adminResult._id},{$set:{otpVerify:false,otp:otp,otpExpireTime:expireTime}},{new:true})
                    if(updateAdmin){
                        return res.send({reponseCode:200,responseMessage:'OTP send successfully .',responseResult:updateAdmin,});
                    }
                }
                }
            }          
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went wrong .',responseResult:error.message,});
        }
    },
    adminLogin:async(req,res)=>{
        try{
          let query = {$and: [{ email: req.body.email },{ status: { $ne: "DELETE" } },{userType:'ADMIN'}],};
          let adminResult = await userModel.findOne(query);
          if(!adminResult){
            return res.send({reponseCode:404,responseMessage:'Admin not found .',responseResult:[],});
          }
          else{
            if(adminResult.otpVerify==false){
                return res.send({reponseCode:401,responseMessage:'Admin not verified',responseResult:[]},);
            }
            else{
                let passCheck = bcrypt.compareSync(req.body.password,adminResult.password);
                if(passCheck==false){
                  return res.send({reponseCode:401,responseMessage:'Incorrect password.',})
                }
                else{
                    let data = {adminId:adminResult._id,email:adminResult.email}
                      let token = jwt.sign(data,'test',{expiresIn:'1h'})
                  return res.send({reponseCode:200,responseMessage:'Admin login Successfully',responseResult:adminResult,token},); 
                }
            }
          }
        }catch(error)
        {
          return res.send({responseCode: 500,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    adminForgotPassword:async(req,res)=>{
        try{
          let query = {$and:[{email:req.body.email},{status:{$ne:"DELETE"}},{userType:'ADMIN'}],};
          let adminResult = await userModel.findOne(query);
          if(!adminResult){
            return res.send({reponseCode:404,responseMessage:'Admin not found .',responseResult:[],});
          }
          else{
            let otpForgot = commonFunction.otp()
            // let otpTime = Date.now()
            req.body.otpExpireTime=Date.now()+5*60*1000;
            let otpTime = req.body.otpExpireTime
            let subject = 'OTP varification for forgot password';
            let text = `Your OTP for verification : ${otpForgot}`;
            let send = await commonFunction.sendMail(req.body.email,subject,text,)
            if(send){
                let otpUpdate = await userModel.findOneAndUpdate({_id:adminResult._id},{$set:{otp:otpForgot,otpVerify:false,otpExpireTime:otpTime}},{new:true})
                if(otpUpdate){
                    return res.send({reponseCode:200,responseMessage:'OTP send successfully',result:otpUpdate},); 
                }
            }
          }
        }catch(error)
        {
          return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    adminEditProfile: async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId }, { status: { $ne: "DELETE" } }, { userType: 'ADMIN' }], };
            let admin = await userModel.findOne(query);
            if (!admin) {
                return res.send({ reponseCode: 404, responseMessage: 'Admin not found .', responseResult: [] });
            } else {
                    let updateAdmin = await userModel.findByIdAndUpdate({ _id: admin._id }, { $set: req.body }, { new: true })
                    if (updateAdmin) {
                        return res.send({ reponseCode: 200, responseMessage: 'Succesfully updated', responseResult: updateAdmin });
                    }
                else {
                    if (req.body.email == userCheck.email) {
                        return res.send({ reponseCode: 409, responseMessage: 'Email already in use.', responseResult: [] });
                    }
                }
            }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went wrong', responseResult: error.message });
        }
    },
    adminResetPassword:async(req,res)=>{
        try {
            let query = {$and:[{$or:[{email:req.body.email},],},{status:{$ne:"DELETE"}},{userType:'ADMIN'}],};
            let adminResult = await userModel.findOne(query);
            if(!adminResult){
              return res.send({reponseCode:404,responseMessage:'Admin not found .',responseResult:[],});
            }
            else{
                    let currentTime =Date.now();
                    if(req.body.otp==adminResult.otp)
                    {
                        if(adminResult.otpExpireTime>=currentTime){
                            req.body.newPassword=bcrypt.hashSync(req.body.newPassword)
                            let adminUpdate =await userModel.findByIdAndUpdate({_id:adminResult._id},{$set:{password:req.body.newPassword,otpVerify:true,}},{new:true})   
                                if (adminUpdate) {
                                    return res.send({reponseCode:200,responseMessage:'Reset password successfully',result:adminUpdate},);
                                }
                    }else{
                            res.send({reponseCode:410,responseMessage:'OTP is Expired',result:[]},);
                           }
                    }else{
                        res.send({reponseCode:400,responseMessage:'Wrong OTP',result:[]},);
                    }
            }   
        } catch (error) {
            return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    adminChangePassword:async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId }, { status: { $ne: "DELETE" } }, { userType: 'ADMIN' }], };
            let adminResult1 = await userModel.findOne(query);
            if(!adminResult1){
              return res.send({reponseCode:404,responseMessage:'Admin not found .',responseResult:[],});
            }
            else{
                let passCheck = bcrypt.compareSync(req.body.password,adminResult1.password);
                if(passCheck==false){
                  return res.send({reponseCode:401,responseMessage:'Incorrect password.',})
                }
                else{
                    let newPassword = req.body.newPassword;
                    let confirmNewPassword  = req.body.confirmNewPassword
                    if(newPassword!=confirmNewPassword)
                    {
                        res.send({reponseCode:401,responseMessage:'password do not match.',})
                    }
                    else{
                        req.body.newPassword=bcrypt.hashSync(newPassword)
                    let adminUpdate =await userModel.findByIdAndUpdate({_id:adminResult1._id},{$set:{password:req.body.newPassword,}},{new:true})   
                        if (adminUpdate) {
                            return res.send({reponseCode:200,responseMessage:'Password changed successfully',result:adminUpdate},);
                        }
                    }
                }
            }               
        } catch (error) {
            return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    adminViewProfile: async (req, res) => {
        try {
            let query = { $and: [{ _id:req.dataId }, { status: { $ne: "DELETE" } }, { userType: 'ADMIN' }], };
            let data = await userModel.findOne(query)
            if (!data) {
                res.send({ responseCode: 404, responseMessage: 'Admin data not found!', responseResult: [] })
            } else {
                res.send({ responseCode: 200, responseMessage: 'Admin data found!', responseResult: data })
            }
        } catch (error) {
            res.send({ responseCode: 501, responseMessage: 'Something went wrong!', responseResult: error.message })
        }
    },  
    adminViewCenterList:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    adminDeleteCenter:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    adminBookingSlot:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    adminCancelSlot:async(req,res)=>
    {
        try {
            
        } catch (error) {
            
        }
    },
    adminViewSlotDetail:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    adminDeleteCenter:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    adminDeleteSubAdmin:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    }
}

