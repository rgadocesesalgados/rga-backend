import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAdmin } from './middlewares/isAdnin'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListProductController } from './controllers/product/ListProductController'
import { EditeProductController } from './controllers/product/EditeProductController'
import { RemoveProductController } from './controllers/product/RemoveProductController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { EditCategoryController } from './controllers/category/EditCategoryController'
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController'
import { CreateRecheioController } from './controllers/recheio/CreateRecheioController'
import { ListRecheioController } from './controllers/recheio/ListRecheioController'
import { EditRecheioController } from './controllers/recheio/EditRecheioController'
import { RemoveRecheioController } from './controllers/recheio/RemoveCategoryController'
import { CreateClientController } from './controllers/client/CreateClientController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World!')
})

routes.post(
  '/user',
  isAuthenticated,
  isAdmin,
  new CreateUserController().handle
)

routes.post('/auth', new AuthUserController().handle)

routes.post(
  '/product',
  isAuthenticated,
  isAdmin,
  new CreateProductController().handle
)

routes.get('/product', new ListProductController().handle)

routes.patch(
  '/product/edit',
  isAuthenticated,
  isAdmin,
  new EditeProductController().handle
)

routes.delete(
  '/product/remove',
  isAuthenticated,
  isAdmin,
  new RemoveProductController().handle
)

routes.post(
  '/category',
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle
)

routes.get('/category', new ListCategoryController().handle)

routes.patch(
  '/category',
  isAuthenticated,
  isAdmin,
  new EditCategoryController().handle
)

routes.delete(
  '/category',
  isAuthenticated,
  isAdmin,
  new RemoveCategoryController().handle
)

routes.post(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new CreateRecheioController().handle
)

routes.get('/recheio', new ListRecheioController().handle)

routes.patch(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new EditRecheioController().handle
)

routes.delete(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new RemoveRecheioController().handle
)

routes.post(
  '/client',
  isAuthenticated,
  isAdmin,
  new CreateClientController().handle
)

export { routes }
