import { z } from 'zod'

export const CreateTaskDto = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  status: z.string().min(2, 'Status deve ter pelo menos 1 caracteres'),
  userId: z.string().uuid('Formato de userID invalido'),
})

export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>
