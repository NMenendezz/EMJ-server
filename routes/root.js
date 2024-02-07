import { fileURLToPath } from 'url'
import { Router } from 'express'
import path from 'path'

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router
