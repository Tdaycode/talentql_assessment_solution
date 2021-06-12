const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');
const checkForManagePostPermission = require('../middleware/managePost');

const router = express.Router();
router
  .route('/post')
  .get(auth(), validate(postValidation.getPosts), postController.getPosts)
  .post(auth(), validate(postValidation.createPost), postController.createPost);

router
  .route('/post/:postId')
  .get(auth(), validate(postValidation.getPostById), postController.getPostById)
  .patch(
    auth(),
    validate(postValidation.updatePostById),
    checkForManagePostPermission(),
    postController.updatePostById
  )
  .delete(
    auth(),
    validate(postValidation.deletePostById),
    checkForManagePostPermission(),
    postController.deletePostById
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post management.
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get posts by User.
 *     description: Get posts by User.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Post'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   post:
 *     summary: Create a Post
 *     description: Create a Post.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - content
 *             properties:
 *               $ref: '#/components/schemas/Post'
 *             example:
 *               content: first post here
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/DuplicateTitle'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /post/{postId}:
 *   get:
 *     summary: Get post by post id.
 *     description: Get post by post id.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: post id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a Post
 *     description: Update a Post by Post id.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       "200":
 *         $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/DuplicateTitle'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   delete:
 *     summary: Delete a post
 *     description: Logged in users can delete only their post.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
