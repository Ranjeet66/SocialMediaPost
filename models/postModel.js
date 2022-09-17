const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var postModel = new Schema({
    userId: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    LikesId: {
        type: Array
    },
    totalComment: {
        type: Number,
        default: 0
    },
    comment: [{
        commentId:{
            type:String
        },
        message:{
            type:String 
        },
    }],
    totalShare: {
        type: Number,
        default: 0
    },
    Image: {
        type: Array
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    privacy: {
        type: String,
        enum: ["PUBLIC", "PRIVATE"],
        default: "PUBLIC"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    },
},
    { timestamp: true }
)
postModel.plugin(mongoosePaginate);
module.exports = mongoose.model("post",postModel);