const usermodel = require('../models/userModel')
const postModel  = require('../models/postModel')
const bcryptjs = require('bcryptjs');
const commonFunction = require('../helper/commonFunction');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
var speakeasys = require("speakeasy");
module.exports =
{
    addPost: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var imageList = new Array;
                for (i = 0; i < req.files.length; i++){
                    uploadRes = await commonFunction.uploadImage(req.files[i].path);
                    imageList.push(uploadRes)
                }
                req.body.userId = user._id
                if (req.body.privacy) {
                    if (req.body.title) {
                        req.body.Image = imageList
                        req.body.title = req.body.title
                        req.body.privacy = req.body.privacy
                        const saveRes = await postModel(req.body).save()
                        return res.send({ responseCode: 200, responseMessage: "Post Add Successfull", responseResult: saveRes });
                    } else {
                        req.body.Image = imageList
                        const saveRes = await postModel(req.body).save()
                        return res.send({ responseCode: 200, responseMessage: "Post Add Successfull", responseResult: saveRes });
                    }
                } else {
                    if (req.body.title) {
                        req.body.Image = imageList
                        req.body.title = req.body.title
                        const saveRes = await postModel(req.body).save()
                        return res.send({ responseCode: 200, responseMessage: "Post Add Successfull", responseResult: saveRes });
                    } else {
                        req.body.Image = imageList
                        const saveRes = await postModel(req.body).save()
                        return res.send({ responseCode: 200, responseMessage: "Post Add Successfull", responseResult: saveRes });
                    }
                }

            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Somehting went wrong ", responseResult: error });
        }
    },
    editPost: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.userId, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var post = await postModel.findOne({ _id: req.body.postid, userId: user._id });
                if (post) {
                    if (req.body.privacy) {
                        if (req.files.length) {
                            var imageList = new Array;
                            for (i = 0; i < req.files.length; i++) {
                                uploadRes = await commonFunction.uploadImg(req.files[i].path);
                                imageList.push(uploadRes)
                            }
                            req.body.Image = imageList
                            let updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: (req.body) }, { new: true });
                            return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                        } else {
                            let updateRes = await categoryModel.findByIdAndUpdate({ _id: category._id }, { $set: { name: req.body.title, privacy: req.body.privacy } }, { new: true });
                            return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                        }
                    } else {
                        if (req.files.length) {
                            var imageList = new Array;
                            for (i = 0; i < req.files.length; i++) {
                                uploadRes = await commonFunction.uploadImg(req.files[i].path);
                                imageList.push(uploadRes)
                            }
                            req.body.Image = imageList
                            let updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: (req.body) }, { new: true });
                            return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                        } else {
                            let updateRes = await categoryModel.findByIdAndUpdate({ _id: category._id }, { $set: { name: req.body.title } }, { new: true });
                            return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                        }
                    }
                } else {
                    return res.send({ responseCode: 409, responseMessage: "post is not exist " })
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Somehting went wrong ", responseResult: error });
        }
    },
    deletePost: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var post = await postModel.findOne({ _id: req.body.postid, userId: user._id });
                if (post) {
                    if (post.status == "ACTIVE") {
                        postModel.findByIdAndUpdate({ _id: post._id }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateRes) => {
                            if (updateErr) {
                                return res.send({ responseCode: 500, responseMessage: "Internal server error" });
                            } else {
                                return res.send({ responseCode: 200, responseMessage: "DELETE successfully", responseResult: updateRes });
                            }
                        })
                    } else {
                        return res.send({ responseCode: 200, responseMessage: "Already Delete " });
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Somehting went wrong ", responseResult: error });
        }
    },
    postList: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                let query = { userId: req.userId, status: { $ne: "DELETE" } }
                if (req.body.fromDate && !req.body.toDate) {
                    query.createdAt = { $gte: req.body.fromDate };
                }
                if (!req.body.fromDate && req.body.toDate) {
                    query.createdAt = { $gte: req.body.toDate };
                }
                if (req.body.fromDate && req.body.toDate) {
                    query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }]
                }
                let options = {
                    limit: parseInt(req.body.limit) || 10,
                    page: parseInt(req.body.page) || 1,
                    sort: { createdAt: -1 }
                };
                let pagi = await postModel.paginate(query, options);
                if (pagi.docs.length != 0) {
                    return res.send({ responseCode: 200, responseMessage: "Data fetch Successfully", responseResult: pagi });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
    allFriendAndUserPostList: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER"});
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                let query = { privacy: "PUBLIC", status: { $ne: "DELETE" } }
                if (req.body.fromDate && !req.body.toDate) {
                    query.createdAt = { $gte: req.body.fromDate };
                }
                if (!req.body.fromDate && req.body.toDate) {
                    query.createdAt = { $gte: req.body.toDate };
                }
                if (req.body.fromDate && req.body.toDate) {
                    query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }]
                }
                let options = {
                    limit: parseInt(req.body.limit) || 10,
                    page: parseInt(req.body.page) || 1,
                    sort: { createdAt: -1 }
                };
                let pagi = await postModel.paginate(query, options);
                if (pagi.docs.length != 0) {
                    return res.send({ responseCode: 200, responseMessage: "Data fetch Successfully", responseResult: pagi });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
    postLikes: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var post = await postModel.findOne({ _id: req.body.postid });
                if (post) {
                    var like = await postModel.findOne({ LikesId: user._id });
                    if (like) {
                        await postModel.findByIdAndUpdate({ _id: post._id }, { $pull: { LikesId: user._id } }, { new: true });
                        var updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: { likes: post.likes - 1 } }, { new: true });
                    } else {
                        await postModel.findByIdAndUpdate({ _id: post._id }, { $push: { LikesId: user._id } }, { new: true });
                        var updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: { likes: post.likes + 1 } }, { new: true });
                    }
                    return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Post is not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
    sharePost: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var post = await postModel.findOne({ _id: req.body.postid });
                if (post) {
                    var updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: { totalShare: post.totalShare + 1 } }, { new: true });
                    return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Post is not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
    comment: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                var post = await postModel.findOne({ _id: req.body.postid });
                if (post) {
                    await postModel.findByIdAndUpdate({ _id: post._id }, { $push: { comment: { $each: [{ commentId: user._id, message: req.body.message }] } } }, { new: true });
                    var updateRes = await postModel.findByIdAndUpdate({ _id: post._id }, { $set: { totalComment: post.totalComment + 1 } }, { new: true });
                    return res.send({ responseCode: 200, responseMessage: "success", responseResult: updateRes });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Post is not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
    commentDelete: async (req, res) => {
        try {
            var user = await usermodel.findOne({ _id: req.body._id, userType: "USER" });
            if (!user) {
                return res.send({ responseCode: 409, responseMessage: "Data is not exist" });
            } else {
                // let updateRes = await postModel.findOneAndUpdate({ "comment._id":req.body.commentid }, { $pull: { comment: {commentId:user._id} } }, { new: true });
                let updateRes = await postModel.findOneAndUpdate({ "comment.commentId": user._id }, { $pull: { comment: { _id: req.body.commentid } } }, { new: true });
                if (updateRes) {
                    return res.send({ responseCode: 200, responseMessage: "Comment Delete Successfully", responseResult: updateRes });
                } else {
                    return res.send({ responseCode: 409, responseMessage: "Comment not exist" });
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "Something went wrong", responseResult: error });
        }
    },
}