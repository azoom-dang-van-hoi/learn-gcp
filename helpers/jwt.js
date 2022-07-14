import jwt from "jsonwebtoken"

export const generateToken = (data, secretSignature, tokenLife = 15 * 60) => {
  return jwt.sign(data, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife,
  })
}

export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      return resolve(decoded)
    })
  })
}
