import { Router } from 'express'
import { localStrategyAuth } from '../libs/passport.local'
import { loginController } from '../controllers/auth.controller'

const router = Router()

router.post('/login', localStrategyAuth, loginController)

export default router
