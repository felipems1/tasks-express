import { RequestHandler } from 'express'
import { CreateUserDto } from '../dtos/create-user.dto'
import { createUser, findUserByEmail } from '../services/user.service'
import { formatErrors } from '../helpers/format-errors'

export const createUserController: RequestHandler = async (req, res) => {
  const result = CreateUserDto.safeParse(req.body)

  if (!result.success) {
    const errorDetails = formatErrors(result.error)

    res.status(400).json({
      error: 'Dados inválidos',
      details: errorDetails,
    })
    return
  }

  const existingUser = await findUserByEmail(result.data.email)

  if (existingUser) {
    res.status(409).json({ error: 'E-mail já cadastrado' })
    return
  }

  try {
    await createUser(result.data)
    res.status(201)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' })
  }
}
