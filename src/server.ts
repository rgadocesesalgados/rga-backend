import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})
app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000')
})