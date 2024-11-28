import bcrypt from 'bcrypt'
import { CreateUserDtoType } from '../dtos/create-user.dto'
import { User } from '../interfaces/user.interface'
import { prisma } from '../libs/prisma'

export const createUser = async (data: CreateUserDtoType): Promise<void> => {
  const { email, password, username } = data

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

export const findUserByEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = await findUserByEmail(email)

  if (!user) return null

  const isPasswordValid = await bcrypt.compare(password, user.password)
  return isPasswordValid ? user : null
}

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
}
