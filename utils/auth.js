import jwt from "jsonwebtoken";


export const createTokenJWT = (user) => {
  return jwt.sign(user, 'theSkysignrun', {
    expiresIn: '1h',
  })
}

