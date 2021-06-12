const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    postedBy: Joi.string().custom(objectId)
  })
};

const getPosts = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getPostById = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId)
  }),
};

const updatePostById = {
  body: Joi.object().keys({
    content: Joi.string().required()
  }),
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId)
  }),
};

const deletePostById = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId)
  }),
};

module.exports = {
  createPost,
  getPosts,
  updatePostById,
  deletePostById,
  getPostById,
};
