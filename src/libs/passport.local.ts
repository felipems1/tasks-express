import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { findUserByEmailAndPassword } from '../services/user.service'
import { RequestHandler } from 'express'
import { createJWT } from '../services/auth.service'

export interface LocalStrategyResponse {
  auth: {
    token: string
  }
}

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    const user = await findUserByEmailAndPassword(email, password)

    if (user) {
      const token = createJWT(user)
      const response: LocalStrategyResponse = {
        auth: { token },
      }
      return done(null, response)
    } else {
      return done(null, false)
    }
  },
)

export const localStrategyAuth: RequestHandler = (req, res, next) => {
  const authRequest = passport.authenticate(
    'local',
    (_err: unknown, response: LocalStrategyResponse | false) => {
      if (response) {
        req.authInfo = response.auth
        return next()
      }
      return res.status(401).json({ error: 'Acesso negado' })
    },
  )
  authRequest(req, res, next)
}
