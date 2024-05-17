import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAdmin } from './middlewares/isAdmin'
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
import { RemoveRecheioController } from './controllers/recheio/RemoveRecheioController'
import { CreateClientController } from './controllers/client/CreateClientController'
import { EditClientController } from './controllers/client/EditClientController'
import { ListClientController } from './controllers/client/ListClientController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { ListOrderController } from './controllers/order/ListOrderController'
import { CreateBoloController } from './controllers/bolo/CreateBoloController'
import { AddRecheioController } from './controllers/bolo/AddRecheioController'
import { DeleteRecheioController } from './controllers/bolo/DeleteRecheioController'
import { CreateTopperController } from './controllers/topper/CreateTopperController'
import { DeleteTopperController } from './controllers/topper/DeleteTopperController'
import { EditOrderController } from './controllers/order/EditOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { CreateAddressController } from './controllers/address/CreateAddressController'
import { ListAddressController } from './controllers/address/ListAddressController'
import { EditAddressController } from './controllers/address/EditAddressController'
import { UserDetailsController } from './controllers/user/UserDetailsController'
import { DeleteClientController } from './controllers/client/DeleteClientController'
import { RemoveAddressController } from './controllers/address/RemoveAddressController'
import multer from 'multer'
import { RelatoriosController } from './controllers/relatorios/RelatoriosController'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

routes.post(
  '/user',
  isAuthenticated,
  isAdmin,
  new CreateUserController().handle
)

routes.post('/auth', new AuthUserController().handle)

routes.get('/me', isAuthenticated, new UserDetailsController().handle)

routes.post(
  '/product',
  isAuthenticated,
  isAdmin,
  new CreateProductController().handle
)

routes.get('/product', new ListProductController().handle)

routes.patch(
  '/product',
  isAuthenticated,
  isAdmin,
  new EditeProductController().handle
)

routes.delete(
  '/product',
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
  '/address',
  isAuthenticated,
  isAdmin,
  new CreateAddressController().handle
)

routes.get('/address', isAuthenticated, new ListAddressController().handle)

routes.patch('/address', isAuthenticated, new EditAddressController().handle)

routes.delete(
  '/address',
  isAuthenticated,
  isAdmin,
  new RemoveAddressController().handle
)

routes.post(
  '/client',
  isAuthenticated,
  isAdmin,
  new CreateClientController().handle
)

routes.get('/client', new ListClientController().handle)

routes.patch(
  '/client',
  isAuthenticated,
  isAdmin,
  new EditClientController().handle
)

routes.delete(
  '/client',
  isAuthenticated,
  isAdmin,
  new DeleteClientController().handle
)

routes.post(
  '/order',
  isAuthenticated,

  new CreateOrderController().handle
)

routes.get('/order', isAuthenticated, new ListOrderController().handle)

routes.patch('/order', isAuthenticated, new EditOrderController().handle)

routes.delete('/order', isAuthenticated, new RemoveOrderController().handle)

routes.post('/bolo', isAuthenticated, new CreateBoloController().handle)

routes.patch(
  '/bolo/add-recheio',
  isAuthenticated,
  new AddRecheioController().handle
)

routes.patch(
  '/bolo/delete-recheio',
  isAuthenticated,
  new DeleteRecheioController().handle
)

routes.post(
  '/bolo/add-topper',
  isAuthenticated,
  new CreateTopperController().handle
)

routes.delete(
  '/bolo/delete-topper',
  isAuthenticated,

  new DeleteTopperController().handle
)

routes.get('/relatorios', new RelatoriosController().handle)

export { routes }
