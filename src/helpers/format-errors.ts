import { ZodError } from 'zod'

export function formatErrors(error: ZodError) {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))
}
