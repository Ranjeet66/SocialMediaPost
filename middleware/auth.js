const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
module.exports = {
   jwtToken:async(req,res,next)=>{
      try{ 
          let decode = await jwt.verify(req.headers.token,'test');
      if(decode){
        let data = await userModel.findOne({$or:[{_id:decode.userId,userType:'USER'}]});
        if(data){
         if(data.status=='BLOCK'){
           res.send({responseMessage:'BLOCK'})
         }
         else if(data.status=='DELETE'){
           res.send({responseMessage:'DELETE'})
         }
         else{
           req.dataId=data._id;
           next()   
         }
        } 
      }
    }catch(error){
       return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
      }
   },
   subjwtToken:async(req,res,next)=>{
    try{ 
        let decode = await jwt.verify(req.headers.token,'test');
    if(decode){
      let data = await userModel.findOne({$or:[{_id:decode.adminId,userType:'ADMIN'},{_id:decode.subAdminId,userType:'SUB-ADMIN'}]});
      if(data){
       if(data.status=='BLOCK'){
         res.send({responseMessage:'BLOCK'})
       }
       else if(data.status=='DELETE'){
         res.send({responseMessage:'DELETE'})
       }
       else{
         req.dataId=data._id;
         next()   
       }
      } 
    }
  }catch(error){
     return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
    }
 }
  }