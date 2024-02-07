import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_ACCESS, {
    expiresIn: '15d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict'
  })

  return token
}

export default generateTokenAndSetCookie