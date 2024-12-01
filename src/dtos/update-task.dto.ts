import { z } from 'zod'

export const UpdateTaskDto = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  status: z.string().min(2, 'Status deve ter pelo menos 2 caracteres'),
})

export type UpdateTaskDtoType = z.infer<typeof UpdateTaskDto>
