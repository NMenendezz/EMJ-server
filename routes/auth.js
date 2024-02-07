import { register, login, authWithGoogle } from '../controllers/auth.js'
import { Router } from 'express'
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google-auth', authWithGoogle)

export default router
