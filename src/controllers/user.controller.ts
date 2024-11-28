import { RequestHandler } from 'express'
import { CreateUserDto } from '../dtos/create-user.dto'
import { createUser, findUserByEmail } from '../services/user.service'

export const createUserController: RequestHandler = async (req, res) => {
  const result = CreateUserDto.safeParse(req.body)

  if (!result.success) {
    const errorDetails = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }))

    res.status(400).json({
      error: 'Dados inválidos',
      details: errorDetails,
    })
    return
  }

  const existingUser = await findUserByEmail(result.data.email)

  if (existingUser) {
    res.status(409).json({ message: 'E-mail já cadastrado' })
    return
  }

  try {
    const user = await createUser(result.data)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' })
  }
}
