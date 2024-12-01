import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import taskRoutes from './task.route'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/task', taskRoutes)

export default router
