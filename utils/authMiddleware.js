/**
 * Middleware service for handling Authentication
 * @module utils/authMiddleware
 * @requires models/accountModel
 */

const accountModel = require('../models/accountModel'),
  AUTH_HEADER = 'authorization',
  DEFAULT_AUTH_SCHEME = 'Bearer';

const auth = async (req, res, next) => {
  res.user = {};
  const authStr = req.headers[AUTH_HEADER];
  const token = authStr ? getBearer(authStr) : null;

  if(!token)
    return next();

  user = await findKey(token)
    .catch(e => console.error(e));

  if (user)
    res.user = fillUpUser(user)

  next();
}

/**
 * Extract token string from header
 * @param  {string} authStr Incoming string from AUTH_HEADER
 * @return {string} extracted string         
 */
const getBearer = authStr => {
  const regex = new RegExp(`^${DEFAULT_AUTH_SCHEME}\\s+(.*)$`, 'i');
  const match = authStr.match(regex);
  return  match ? match[1] : null;
};

const findKey = token => accountModel.findOne({password: token});

/**
 * Makes User's session data
 * @param  {Object} user User's model
 * @return {Object}
 */
const fillUpUser = user => ({
  address: user.address
});

module.exports = auth;
