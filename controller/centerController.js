const centerModel = require('../models/centerModel')
const addressModel = require('../models/addressModel');
const subAdminModel = require('../models/subadminModel');
const commonFunction = require('../helper/commonFunction');
const moment = require('moment')

module.exports = {
    addCenter: async (req, res) => {
        try {

            let query1 = { $and: [{ centerName: req.body.centerName }, { status: { $ne: "DELETE" } },], };
            let centerAdd = await centerModel.findOne(query1)
            if (centerAdd) {
                return res.send({ reponseCode: 409, responseMessage: 'center already exists', responseResult: [] })
            } else {
                let stime = new Date()
                req.body.date = stime.toDateString();
                stime.setHours(09) + stime.setMinutes(00) + stime.setSeconds(00)
                let startTime = stime.toLocaleTimeString() + " AM"
                req.body.openingTime = startTime
                let eTime = new Date()
                eTime.setHours(05) + eTime.setMinutes(00) + eTime.setSeconds(00)
                let endTime = eTime.toLocaleTimeString() + " PM"
                req.body.closingTime = endTime
                req.body.slots = await commonFunction.generateSlots()
                let saveCenter = await new centerModel(req.body).save()
                if (saveCenter) {
                    let saveAddress = await new addressModel(req.body).save();
                    if (saveAddress) {
                        let updateCenter = await centerModel.findByIdAndUpdate({ _id: saveCenter._id }, { $set: { addressId: saveAddress._id, otp: req.body.otp } }, { new: true })
                        if (updateCenter) {
                            return res.send({ reponseCode: 200, responseMessage: 'center add successfully', responseResult: updateCenter, saveAddress })
                        }
                    }
                }
            }
            // }else{
            //     return res.send({reponseCode:404,responseMessage:'you are not admin or sub-admin',result:[]})
            // }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went worng', result: error.message })
        }
    },
    deleteCenter: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    viewCenter: async (req, res) => {
        try {
            var query = ({ status: { $ne: 'DELETE' }});
            if (req.query.search) {
                query.$or = [
                    { storeName: { $regex: req.query.search, $options: 'i' } },

                ]
            }
            let findByLocation = centerModel.aggregate([{ "$geoNear": { "near": { "type": "Point", "coordinates": [parseFloat(req.query.long), parseFloat(req.query.lat)] }, "maxDistance": 5 * 1000, 'distanceField': 'distance', "distanceMultiplier": 1 / 1000, "spherical": true } }])
            let options = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10
            }
            let userData = await centerModel.aggregatePaginate(query,options);
            console.log(userData)
            // return
            if (userData.docs.length == 0) {
                res.send({ responseCode: 404, responsemessage: 'Data Not found', result: [] })
            }
            else {

                res.send({ responseCode: 200, responsemessage: 'Data found successfully', result: userData })
            }

        }
        catch (error) {
            console.log(error)

            res.send({ responseCode: 500, responsemessage: 'Something went wrong', result: [] })
        }
    },
    slotBooking: async (req, res) => {
        try {
            let x = new Date();
            console.log("ddddddddddd", x);
            let y = x.getDay();
            console.log("ddddddddddd", y);
            if (y != 0) {

            }
            else {
                console.log("today is sunday")
            }

            // var g1 = new Date(2022,06,28,14,10,42);

            // var g2 = new Date(2022,06,28,15,22,42);

            // if (g1.getTime() <= g2.getTime()){
            // res.send({responseCode:200,responseMessage:'slot booked succesfully ',result:g2})

            // }
            // else if (g1.getTime() > g2.getTime()){
            // res.send({responseCode:404,responseMessage:'book future slot',result:[]})
            // }
            // else{

            // }
            //  console.log("both are equal");
            //  res.send({responseCode:200,responseMessage:'booked successfully',result:userResult1}) 
        } catch (error) {
            console.log(error)
            res.send({ responseCode: 501, responseMessage: 'Something went wrong', result: error })
        }
    },
    cancelSlot: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    approvelSlot: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    viewSlotDelete: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}