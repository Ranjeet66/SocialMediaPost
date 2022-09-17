const staticModel = require('../models/staticModel')
module.exports = 
{
 listStatic: async (req, res) => {
   try {
     let query = { status: "ACTIVE" };
     let options = {
       page: parseInt(req.query.page) || 1,
       limit: parseInt(req.query.limit) || 10,
       sort:{createdAt:-1}
     }
     let staticData = await staticModel.paginate(query,options);
     if (staticData.docs.length != 0) {
       res.send({
         responseCode: 200,
         responseMessage: "Static data found!",
         responseResult: staticData,
       });
     } else {
       res.send({
         responseCode: 404,
         responseMessage: "Static data not found!",
         responseResult: [],
       });
     }
   } catch (error) {
     res.send({
       responseCode: 501,
       responseMessage: "Something went wrong!",
       responseResult: error.message,
     });
   }
 },
 viewStatic: async (req, res) => {
   try {
     let query = { type:req.query.type, status: "ACTIVE" };
     let staticData = await staticModel.find(query);
     if (staticData.length != 0) {
       res.send({
         responseCode: 200,
         responseMessage: "Static data found!",
         responseResult: staticData,
       });
     } else {
       res.send({
         responseCode: 404,
         responseMessage: "Static data not found!",
         responseResult: [],
       });
     }
   } catch (error) {
     res.send({
       responseCode: 501,
       responseMessage: "Something went wrong!",
       responseResult: error.message,
     });
   }
 },
 editStatic:async(req,res)=>{
  try {
    let query = {_id:req.body._id,status:'ACTIVE'}
    let staticData = await staticModel.find(query);
    if (!staticData) {
      res.send({responseCode:404,responseMessage:'Static data not found!',responseResult:[]})
    } else {
      let updateStatic = await staticModel.findByIdAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
      res.send({responseCode:200,responseMessage:'Updated successfully',responseResult:updateStatic})
    }
  } catch (error) {
    res.send({responseCode:501,responseMessage:'Something went wrong!',responseResult:error.message})
  }
 }
}
 