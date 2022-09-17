const router =  require('express').Router();
const userRouter = require('../controller/userController')
const auth = require('../middleware/auth')
const multer = require('multer')
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({storage:storage})

/**
* @swagger
* /user/signUp:
*   post:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: firstName
*         description: firstName is required.
*         in: formData
*         required: true
*       - name: lastName
*         description: lastName is required.
*         in: formData
*         required: true
*       - name: dateOfBirth
*         description: dateOfBirth is required.
*         in: formData
*         required: true
*       - name: mobileNumber
*         description: mobileNumber is required.
*         in: formData
*         required: true
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: password
*         description: password is required.
*         in: formData
*         required: true
*       - name: confirmPassword
*         description: confirmPassword is required.
*         in: formData
*         required: true
*       - name: image
*         description: image is required.
*         in: formData
*         type: file
*         required: true
*       - name: street
*         description: street is required.
*         in: formData
*         required: false
*       - name: area
*         description: area is required.
*         in: formData
*         required: false
*       - name: city
*         description: city is required.
*         in: formData
*         required: false
*       - name: state
*         description: state is required.
*         in: formData
*         required: false
*       - name: country
*         description: country is required.
*         in: formData
*         required: false
*       - name: pin
*         description: pin is required.
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/

router.post("/signUp",upload.single('image'),userRouter.signUp)
/**
* @swagger
* /user/verifyOTP:
*   put:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: otp
*         description: otp is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put("/verifyOTP",userRouter.verifyOTP)
/**
* @swagger
* /user/resendOtp:
*   put:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/

router.put("/resendOTP",userRouter.resendOtp)
/**
* @swagger
* /user/login:
*   post:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: password
*         description: password is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.post("/login",userRouter.login)
/**
* @swagger
* /user/forgotPassword:
*   put:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put("/forgotPassword",userRouter.forgotPassword)
/**
* @swagger
* /user/editProfile:
*   put:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token is required.
*         in: header
*         required: true
*       - name: firstName
*         description: firstName is required.
*         in: formData
*         required: false
*       - name: lastName
*         description: lastName is required.
*         in: formData
*         required: false
*       - name: dateOfBirth
*         description: dateOfBirth is required.
*         in: formData
*         required: false
*       - name: image
*         description: image is required.
*         in: formData
*         type: file
*         required: true
*       - name: street
*         description: street is required.
*         in: formData
*         required: false
*       - name: area
*         description: area is required.
*         in: formData
*         required: false
*       - name: city
*         description: city is required.
*         in: formData
*         required: false
*       - name: state
*         description: state is required.
*         in: formData
*         required: false
*       - name: country
*         description: country is required.
*         in: formData
*         required: false
*       - name: pin
*         description: pin is required.
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put("/editProfile",auth.jwtToken,upload.single('image'),userRouter.editProfile)
/**
* @swagger
* /user/getProfile/{_id}:
*   get:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: _id
*         description: _id is required.
*         in: path
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get("/getProfile",userRouter.getProfile)
/**
* @swagger
* /user/resetPassword:
*   put:
*     tags:
*       - USER MANAGEMENT
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: otp
*         description: otp is required.
*         in: formData
*         required: true
*       - name: newPassword
*         description: newPassword is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put("/resetPassword",userRouter.resetPassword)

module.exports =router
