
const router = require("express").Router()
const postController = require('../controller/postController');
const auth = require('../middleware/auth');

const multer = require('multer');
const upload = multer({ dest: './uploads' });
router.post('/addPost',upload.array('photos', 12),postController.addPost);
router.put('/editPost',upload.array('photos', 12),postController.editPost);
/** 
 * @swagger
 * /post/postList:
 *  post:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: fromDate
 *          description: From Date
 *          in: formData
 *          required: false
 *        - name: toDate
 *          description: To Date
 *          in: formData
 *          required: false
 *        - name: page
 *          description: Page Number
 *          in: formData
 *          required: false
 *        - name: limit
 *          description: Limit
 *          in: formData
 *          required: false
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.post('/postList',postController.postList);

/** 
 * @swagger
 * /post/deletePost:
 *  delete:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: postid
 *          description: post id
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.delete('/deletePost',postController.deletePost);

/** 
 * @swagger
 * /post/commentDelete:
 *  delete:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: commentid
 *          description: comment id
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.delete('/commentDelete',postController.commentDelete);

/** 
 * @swagger
 * /post/postLikes:
 *  post:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: postid
 *          description: post id
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.post('/postLikes',postController.postLikes);

/** 
 * @swagger
 * /post/comment:
 *  post:
 *      tags:
 *        - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: postid
 *          description: post id
 *          in: formData
 *          required: true
 *        - name: message
 *          description: Comment 
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.post('/comment',postController.comment);

/** 
 * @swagger
 * /post/sharePost:
 *  post:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: postid
 *          description: post id
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.post('/sharePost',postController.sharePost);

/** 
 * @swagger
 * /post/allFriendAndUserPostList:
 *  post:
 *      tags:
 *          - POST MANAGEMENT
 *      description: First time entry website add all details 
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: _id
 *          description: _id
 *          in: formData
 *          required: true
 *        - name: fromDate
 *          description: From Date
 *          in: formData
 *          required: false
 *        - name: toDate
 *          description: To Date
 *          in: formData
 *          required: false
 *        - name: page
 *          description: Page Number
 *          in: formData
 *          required: false
 *        - name: limit
 *          description: Limit
 *          in: formData
 *          required: false
 *      responses:
 *          200:
 *            description: Your viewProfile is successful
 *          404:
 *            description: Invalid credentials
 *          500:
 *            description: Internal Server Error
*/
router.post('/allFriendAndUserPostList', postController.allFriendAndUserPostList);
// router.post('/findfriend', auth.jwtToken, postController.findfriend);

module.exports = router;
