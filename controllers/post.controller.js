const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const postService = require('../services/post.service');

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const post = await postService.getPosts(req.user._id);
  res.send(post);
});

const getPostById = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  res.send(post);
});

const updatePostById = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.status(httpStatus.OK).send(post);
});

const deletePostById = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPosts,
  updatePostById,
  deletePostById,
  getPostById,
};
