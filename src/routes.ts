import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World!')
})

routes.post('/user', new CreateUserController().handle)

export { routes }
