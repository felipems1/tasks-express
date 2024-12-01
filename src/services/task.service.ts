import { CreateTaskDtoType } from '../dtos/create-task.dto'
import { UpdateTaskDtoType } from '../dtos/update-task.dto'
import { Task } from '../interfaces/task.interface'
import { prisma } from '../libs/prisma'

export const createTask = async (data: CreateTaskDtoType): Promise<Task> => {
  const task = await prisma.task.create({
    data,
  })

  return task
}

export const findAllTask = async (): Promise<Task[]> => {
  const tasks = await prisma.task.findMany()

  return tasks
}

export const findByIdTask = async (id: string): Promise<Task | null> => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  return task
}

export const deleteTask = async (id: string): Promise<void> => {
  await prisma.task.delete({
    where: {
      id,
    },
  })
}

export const updateTask = async (
  id: string,
  data: UpdateTaskDtoType,
): Promise<Task> => {
  const task = await prisma.task.update({
    where: { id },
    data,
  })

  return task
}
