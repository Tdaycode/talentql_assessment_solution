const moment = require('moment');
const { tokenTypes } = require('../../../config/tokens');
const tokenService = require('../../../services/token.service');
const { userOne } = require('./user.fixture');

const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
const userAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userAccessToken
};
