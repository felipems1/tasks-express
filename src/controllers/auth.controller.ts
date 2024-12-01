import { RequestHandler } from 'express'

export const loginController: RequestHandler = (req, res) => {
  try {
    res.json(req.authInfo)
  } catch (err) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' })
  }
}
