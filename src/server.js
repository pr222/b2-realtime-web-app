/**
 * The starting point of the application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import hbs from 'express-hbs'
import session from 'express-session'
import helmet from 'helmet'
import logger from 'morgan'
import http from 'http'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import { router } from './routes/router.js'

/**
 * The main function.
 */
const main = async () => {
  const app = express()
  const PORT = process.env.PORT || 3000

  const fullDirectory = dirname(fileURLToPath(import.meta.url))
  const baseURL = process.env.BASE_URL || '/'

  app.use(logger('dev'))

  // Helmet
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'https://gitlab.lnu.se/', 'https://secure.gravatar.com'],
        'script-src': ["'self'", "'unsafe-eval'", 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js'],
        'style-src': ["'self'", 'https://fonts.googleapis.com/'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'connect-src': ["'self'"]
      }
    })
  )
  app.use(express.static(join(fullDirectory, '..', 'public')))

  // Set up view engine
  app.engine('hbs', hbs.express4({
    defaultLayout: join(fullDirectory, 'views', 'layouts', 'default'),
    partialsDir: join(fullDirectory, 'views', 'partials')
  }))

  app.set('view engine', 'hbs')
  app.set('views', join(fullDirectory, 'views'))

  // application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }))
  // application/json
  app.use(express.json())

  // Session Options
  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'lax'
    }
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sessionOptions.cookie.secure = true
  }

  app.use(session(sessionOptions))

  // Socket
  const server = http.createServer(app)
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('User connected...')

    socket.on('disconnect', () => {
      console.log('User disconnected...')
    })
  })

  // Middlewares
  app.use((req, res, next) => {
    res.locals.baseURL = baseURL
    res.locals.session = req.session
    res.io = io

    next()
  })

  // Set routes
  app.use('/', router)

  // Errors
  app.use(function (err, req, res, next) {
    if (err.status === 404) {
      return res
        .status(404)
        .sendFile(join(fullDirectory, 'views', 'errors', '404-not-found.html'))
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(500)
        .sendFile(join(fullDirectory, 'views', 'errors', '500-error.html'))
    }

    // Development only!
    res
      .status(err.status || 500)
      .render('errors/error', { error: err })
  })

  server.listen(PORT, () => {
    console.log(`The server is now running at http://localhost:${PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

main().catch(console.error)
