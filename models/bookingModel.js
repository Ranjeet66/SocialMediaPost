var mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
 
var mySchema = new mongoose.Schema({
 /* your schema definition */
 storeName:{
     type:String
 },
 image:{
     type:Array
 },
 location : {
   type : { type:String,default:"Point"},
   coordinates : {type:[Number],default:[0,0]},
},
openingTime:{
   type:String
},
closingTime:{
   type:String
},
status:{type:String,enum:["ACTIVE","BLOCKED","DELETE"],default:"ACTIVE"}
},{
timestamps:true
});
 
mySchema.plugin(aggregatePaginate);
mySchema.index({ location: "2dsphere" })
var myModel = mongoose.model("SampleModel", mySchema);

