import verify from 'jsonwebtoken'

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader) {
      return res.status(401).json({ error: 'you are not authenticated' })
    }
    const token = authHeader.split(' ')[1]
    verify(token, process.env.JWT_ACCESS, (err, user) => {
      if (err) return res.status(403).json({ error: 'token is not valid' })
      req.user = user
      next()
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'internal server error' })
  }
}
