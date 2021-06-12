const httpStatus = require('http-status');
const Post = require('../models/post.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {ObjectId}
 */
const createPost = async (postBody, userId) => {
  const postData = {
    ...postBody,
    postedBy: userId
  };
  const post = await Post.create(postData);
  return post;
};

/**
 * Get all posts by user
 * @returns {Promise<QueryResult>}
 */

const getPosts = async (userId) => {
    const posts = await Post.find({ postedBy: userId });
    if (!posts || posts.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    return posts;
};

/**
 * Get post by postId
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const getPostById = async (postId) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return post;
};

/**
 * Update a post
 * @param {Object} postBody
 * @param {Object} postId
 *  @returns {Promise<Post>}
 */
const updatePostById = async (postId, postBody) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const updatedPost = await Post.findOneAndUpdate({ _id: postId }, postBody, { new: true });
  return updatedPost;
};

/**
 * Delete post by postId
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await Post.deleteOne({ _id: postId });
};

module.exports = {
  createPost,
  getPosts,
  updatePostById,
  deletePostById,
  getPostById,
};
