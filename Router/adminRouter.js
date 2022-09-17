const router =  require('express').Router();
const adminRouter = require('../controller/adminController')
const auth = require('../middleware/auth')

/**
* @swagger
* /admin/adminOtpVerify:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
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

router.put("/adminOtpVerify",adminRouter.adminOtpVerify)
/**
* @swagger
* /admin/adminResendOtp:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
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
router.put("/adminResendOtp",adminRouter.adminResendOtp)
/**
* @swagger
* /admin/adminLogin:
*   post:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: password
*         description: passwoed is required.
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
router.post("/adminLogin",adminRouter.adminLogin)
/**
* @swagger
* /admin/adminForgotPassword:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
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
router.put("/adminForgotPassword",adminRouter.adminForgotPassword)
/**
* @swagger
* /admin/adminEditProfile:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
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
*       - name: mobileNumber
*         description: mobileNumber is required.
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
router.put("/adminEditProfile",auth.jwtToken,adminRouter.adminEditProfile)
/**
* @swagger
* /admin/adminResetPassword:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
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
router.put("/adminResetPassword",adminRouter.adminResetPassword)
/**
* @swagger
* /admin/adminChangePassword:
*   put:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token is required.
*         in: header
*         required: true
*       - name: password
*         description: password is required.
*         in: formData
*         required: true
*       - name: newPassword
*         description: newPassword is required.
*         in: formData
*         required: true
*       - name: confirmNewPassword
*         description: confirmNewPassword is required.
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
router.put("/adminChangePassword",auth.jwtToken,adminRouter.adminChangePassword)
/**
* @swagger
* /admin/adminViewProfile:
*   get:
*     tags:
*       - ADMIN MANAGEMENT
*     description: Creating Docs for ADMIN
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token is required.
*         in: header
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get('/adminViewProfile',auth.jwtToken,adminRouter.adminViewProfile)

module.exports =router