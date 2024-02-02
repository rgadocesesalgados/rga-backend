import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World!')
})

routes.post('/user', new CreateUserController().handle)

routes.post('/auth', new AuthUserController().handle)

export { routes }
