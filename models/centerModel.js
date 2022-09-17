

const mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
// const mongoosePaginate= require('mongoose-paginate')
const Schema = mongoose.Schema;

const centerSchema = new Schema({
   centerName: {
       type: String,
   },
   address: {
       type: String,
   },
   contractNo:{
       type:Number
   },
   date:{
       type:String
   },
   slots:{
       type:[String]
   },
   image:{
       type:Array
   },   
   location: {
       type: {
           type: String,
           default: "Point"
       },
       coordinates: {
           type: [Number],
           default: [0, 0]
       }
   },
   openingTime:{
       type:String
   },
   closingTime:{
       type:String
   }, 
   status:{
       type:String,
       enum:["ACTIVE","BLOCKED","DELETE"],
       default:"ACTIVE"}
   },
   {
   timestamps:true
});

centerSchema.plugin(aggregatePaginate);
centerSchema.index({location: "2dsphere" });

let centerModel = mongoose.model("centerModel", centerSchema);
module.exports = centerModel

