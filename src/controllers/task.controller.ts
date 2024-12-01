import { RequestHandler } from 'express'
import { formatErrors } from '../helpers/format-errors'
import {
  createTask,
  deleteTask,
  findAllTask,
  findByIdTask,
  updateTask,
} from '../services/task.service'
import { CreateTaskDto } from '../dtos/create-task.dto'
import { findUserById } from '../services/user.service'
import { UpdateTaskDto } from '../dtos/update-task.dto'

export const createTaskController: RequestHandler = async (req, res) => {
  const result = CreateTaskDto.safeParse(req.body)

  if (!result.success) {
    const errorDetails = formatErrors(result.error)

    res.status(400).json({
      error: 'Dados inválidos',
      details: errorDetails,
    })
    return
  }

  const existingUser = await findUserById(result.data.userId)

  if (!existingUser) {
    res.status(404).json({ error: 'Usuário não encontrado' })
    return
  }

  try {
    const task = await createTask(result.data)
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' })
  }
}

export const findAllTaskController: RequestHandler = async (req, res) => {
  try {
    const tasks = await findAllTask()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' })
  }
}

export const findByIdTaskController: RequestHandler = async (req, res) => {
  const { id } = req.params

  try {
    const task = await findByIdTask(id)

    if (!task) {
      res.status(404).json({ error: 'Task não encontrada' })
    }

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' })
  }
}

export const deleteTaskController: RequestHandler = async (req, res) => {
  const { id } = req.params

  const task = await findByIdTask(id)

  if (!task) {
    res.status(404).json({ error: 'Task não encontrada' })
  }

  try {
    await deleteTask(id)
    res.json({ message: 'Task excluida' })
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' })
  }
}

export const updateTaskController: RequestHandler = async (req, res) => {
  const { id } = req.params

  const task = await findByIdTask(id)

  if (!task) {
    res.status(404).json({ error: 'Task não encontrada' })
  }

  const result = UpdateTaskDto.safeParse(req.body)

  if (!result.success) {
    const errorDetails = formatErrors(result.error)

    res.status(400).json({
      error: 'Dados inválidos',
      details: errorDetails,
    })
    return
  }

  try {
    const task = await updateTask(id, result.data)
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' })
  }
}
