/**
 * The starting point of the application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'

/**
 * The main function.
 */
const main = async () => {
  const app = express()
  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`The server is now running at http://localhost:${PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
