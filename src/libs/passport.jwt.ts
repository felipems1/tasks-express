import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { findUserById } from '../services/user.service'
import { RequestHandler } from 'express'
import passport from 'passport'
import { User } from '../interfaces/user.interface'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret',
}

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
  const { id } = payload

  const user = await findUserById(id)

  if (user) {
    return done(null, user)
  } else {
    return done(null, false)
  }
})

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
  const authRequest = passport.authenticate(
    'jwt',
    (_err: unknown, user: User | false) => {
      if (user) {
        req.user = user
        return next()
      }
      return res.status(401).json({ error: 'Acesso negado' })
    },
  )
  authRequest(req, res, next)
}
