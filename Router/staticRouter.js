const router = require('express').Router()
const staticController=require('../controller/staticController')

/**
* @swagger
* /static/listStatic:
*   get:
*     tags:
*       - STATIC MANAGEMENT
*     description: Creating Docs for STATIC
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get('/listStatic',staticController.listStatic);
/**
* @swagger
* /static/viewStatic:
*   get:
*     tags:
*       - STATIC MANAGEMENT
*     description: Creating Docs for STATIC
*     produces:
*       - application/json
*     parameters:
*       - name: type
*         description: type is required.
*         in: query
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get('/viewStatic',staticController.viewStatic);
/**
* @swagger
* /static/editStatic:
*   put:
*     tags:
*       - STATIC MANAGEMENT
*     description: Creating Docs for STATIC
*     produces:
*       - application/json
*     parameters:
*       - name: _id
*         description: id is required.
*         in: formData
*         required: true
*       - name: type
*         description: type is required.
*         in: formData
*         required: true
*       - name: title
*         description: title is required.
*         in: formData
*         required: true
*       - name: descriptions
*         description: descriptions is required.
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
router.put('/editStatic',staticController.editStatic);
// router.get('/viewUser/:_id',staticController.viewUser);

module.exports=router
