import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'
import { notFoundRequest } from './routes/not-found.route'
import passport from 'passport'
import { localStrategy } from './libs/passport.local'
import { jwtStrategy } from './libs/passport.jwt'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(localStrategy)
passport.use(jwtStrategy)
app.use(passport.initialize())

app.use('/api', router)

app.use(notFoundRequest)

app.listen(3333, () => {
  console.log('Server Running')
})
