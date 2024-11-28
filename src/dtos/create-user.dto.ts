import { z } from 'zod'

export const CreateUserDto = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  username: z
    .string()
    .min(2, { message: 'Username deve ter pelo menos 2 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})

export type CreateUserDtoType = z.infer<typeof CreateUserDto>
