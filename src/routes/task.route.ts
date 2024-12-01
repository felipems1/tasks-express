import { Router } from 'express'
import { jwtStrategyAuth } from '../libs/passport.jwt'
import {
  createTaskController,
  deleteTaskController,
  findAllTaskController,
  findByIdTaskController,
  updateTaskController,
} from '../controllers/task.controller'

const router = Router()

router.get('/', jwtStrategyAuth, findAllTaskController)
router.get('/:id', jwtStrategyAuth, findByIdTaskController)
router.post('/create', jwtStrategyAuth, createTaskController)
router.delete('/:id', jwtStrategyAuth, deleteTaskController)
router.put('/:id', jwtStrategyAuth, updateTaskController)

export default router
