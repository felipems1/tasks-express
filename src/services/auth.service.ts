import { User } from '../interfaces/user.interface'
import jwt from 'jsonwebtoken'

export const createJWT = (user: User): string => {
  const payload = {
    id: user.id,
  }
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1 hour',
  })
}
