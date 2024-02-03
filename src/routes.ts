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

routes.post('/category', new CreateCategoryController().handle)

routes.get('/category', new ListCategoryController().handle)

routes.patch('/category', new EditCategoryController().handle)

routes.delete('/category', new RemoveCategoryController().handle)

export { routes }
