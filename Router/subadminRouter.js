
const subadmin = require("express").Router();
const subadmin1 = require("../controller/subadminController");
const { UploadImage } = require('../helper/commonFunction');
const auth = require('../middleware/auth');
const multer = require('multer');
const subadminController = require("../controller/subadminController");
const upload = multer({ dest: 'upload' });

subadmin.post("/subadminAdd",subadmin1.subadminAdd);
subadmin.put("/ subadminVerifyOTP",subadminController.subadminVerifyOTP);
subadmin.put("/subadminResendOTP",subadminController.subadminResendOTP);
subadmin.post("/subadminLogin", subadminController.subadminLogin);
subadmin.put("/subadminForgotPassword", subadminController.subadminForgotPassword);
subadmin.get("/subadmingGetProfile", subadminController.subadmingGetProfile);
subadmin.post("/subadminEditProfile", auth.subjwtToken, subadminController.subadminEditProfile);
subadmin.put("/subadminResetPassword", subadminController.subadminResetPassword);
subadmin.put("/subadminChangePassword", auth.subjwtToken, subadminController.subadminChangePassword);
// subadmin.get("/allRecords", subadminController.allRecords);
// subadmin.get("/showResult", subadminController.showResult);
// // subadmin.get("/qrCode",subadminController.qrCode);
// // subadmin.get("/viewUser2", auth.subjwtToken, subadminController.viewUser2);
// subadmin.post("/upload", subadminController.upload);
// subadmin.post("/multiFiles", upload.array('image,15'), subadminController.multiFiles);

module.exports = subadmin;