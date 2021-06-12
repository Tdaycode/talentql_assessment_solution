const httpStatus = require('http-status');
const Post  = require('../models/post.model');
const ApiError = require('../utils/ApiError');

const checkForManagePostPermission = () => async (req, res, next) => {
  const postId = req.params.postId;
  if (postId) {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'post not found'));
    }
    if (post.postedBy.toString() != req.user._id) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
    next();
  }
};

module.exports = checkForManagePostPermission;
