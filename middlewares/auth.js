import jwt from 'jsonwebtoken'
/**
 * function middleware for verify authorization user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  try {
    const verified = jwt.verify(token, 'theSkysignrun')
    req.verifiedUser = verified
    next();
  } catch (error) {
    console.error(error)
    next();//TODO: send error in response about topic
  }
}

