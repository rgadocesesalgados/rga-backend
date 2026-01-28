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
import { RelatoriosController } from './controllers/relatorios/RelatoriosController'
import { ToggleStatusController } from './controllers/relatorios/ToggleStatusController'
import { ListDesliveryController } from './controllers/delivery/ListDesliveryController'
import { ListTopperController } from './controllers/topper/ListTopper'
import { ToDoTopperController } from './controllers/topper/ToDoTopperController'
import { ToDoTopperCheckController } from './controllers/topper/ToDoTopperCheckController'
import { ListFinancialReportController } from './controllers/financial-report/get'
import { CreateSupplierController } from './controllers/supplier/post'
import { ListSupplierController } from './controllers/supplier/get'
import { RemoveSupplierController } from './controllers/supplier/delete'
import { PostOutController } from './controllers/out/post'
import { DeleteOut } from './controllers/out/delete'
import { ListOutController } from './controllers/out/get'
import { SearchClientController } from './controllers/searchClient/SearchClient'
import { SearchAddressController } from './controllers/searchAddress/SearchAddress'
import { ListOrderClientController } from './controllers/order/client/ListOrderClientController'
import { FindUniqueOrderController as FindUniqueOrderControllerv1 } from './controllers/order/FindUniqueOrderController'
import { ListOrdersController } from './v2/controllers/orders/ListOrdersController'
import { FindUniqueOrderController } from './v2/controllers/orders/FindUniqueOrderController'
import { ListOrdersOrganizationController } from './v2/controllers/orders/ListOrdersOrganizationController'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

routes.post(
  '/user',
  isAuthenticated,
  isAdmin,
  new CreateUserController().handle,
)

routes.post('/auth', new AuthUserController().handle)

routes.get('/me', isAuthenticated, new UserDetailsController().handle)

routes.post(
  '/product',
  isAuthenticated,
  isAdmin,
  new CreateProductController().handle,
)

routes.get('/product', isAuthenticated, new ListProductController().handle)

routes.patch(
  '/product',
  isAuthenticated,
  isAdmin,
  new EditeProductController().handle,
)

routes.delete(
  '/product',
  isAuthenticated,
  isAdmin,
  new RemoveProductController().handle,
)

routes.post(
  '/category',
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle,
)

routes.get('/category', isAuthenticated, new ListCategoryController().handle)

routes.patch(
  '/category',
  isAuthenticated,
  isAdmin,
  new EditCategoryController().handle,
)

routes.delete(
  '/category',
  isAuthenticated,
  isAdmin,
  new RemoveCategoryController().handle,
)

routes.post(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new CreateRecheioController().handle,
)

routes.get('/recheio', isAuthenticated, new ListRecheioController().handle)

routes.patch(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new EditRecheioController().handle,
)

routes.delete(
  '/recheio',
  isAuthenticated,
  isAdmin,
  new RemoveRecheioController().handle,
)

routes.post(
  '/address',
  isAuthenticated,
  isAdmin,
  new CreateAddressController().handle,
)

routes.get('/address', isAuthenticated, new ListAddressController().handle)

routes.patch('/address', isAuthenticated, new EditAddressController().handle)

routes.delete(
  '/address',
  isAuthenticated,
  isAdmin,
  new RemoveAddressController().handle,
)

routes.post(
  '/client',
  isAuthenticated,
  isAdmin,
  new CreateClientController().handle,
)

routes.get('/client', isAuthenticated, new ListClientController().handle)

routes.patch(
  '/client',
  isAuthenticated,
  isAdmin,
  new EditClientController().handle,
)

routes.delete(
  '/client',
  isAuthenticated,
  isAdmin,
  new DeleteClientController().handle,
)

routes.post(
  '/order',
  isAuthenticated,

  new CreateOrderController().handle,
)

routes.get('/order', isAuthenticated, new ListOrderController().handle)

routes.patch('/order', isAuthenticated, new EditOrderController().handle)

routes.delete(
  '/order',
  isAuthenticated,
  isAdmin,
  new RemoveOrderController().handle,
)

routes.post('/bolo', isAuthenticated, new CreateBoloController().handle)

routes.patch(
  '/bolo/add-recheio',
  isAuthenticated,
  new AddRecheioController().handle,
)

routes.patch(
  '/bolo/delete-recheio',
  isAuthenticated,
  new DeleteRecheioController().handle,
)

routes.post(
  '/bolo/add-topper',
  isAuthenticated,
  new CreateTopperController().handle,
)

routes.delete(
  '/bolo/delete-topper',
  isAuthenticated,

  new DeleteTopperController().handle,
)

routes.get('/topper', isAuthenticated, new ToDoTopperController().handle)
routes.patch('/topper', isAuthenticated, new ToDoTopperCheckController().handle)

routes.get('/toppers/:fornecedor', new ListTopperController().handle)

routes.post('/relatorios', isAuthenticated, new RelatoriosController().handle)

routes.patch(
  '/relatorios',
  isAuthenticated,
  new ToggleStatusController().handle,
)

routes.get('/delivery', isAuthenticated, new ListDesliveryController().handle)

routes.get(
  '/financial-report',
  isAuthenticated,
  isAdmin,
  new ListFinancialReportController().handle,
)

routes.post(
  '/supplier',
  isAuthenticated,
  isAdmin,
  new CreateSupplierController().handle,
)
routes.get(
  '/supplier',
  isAuthenticated,
  isAdmin,
  new ListSupplierController().handle,
)
routes.delete(
  '/supplier/:id',
  isAuthenticated,
  isAdmin,
  new RemoveSupplierController().handle,
)

routes.post('/out', isAuthenticated, isAdmin, new PostOutController().handle)
routes.delete('/out/:id', isAuthenticated, isAdmin, new DeleteOut().handle)
routes.get('/out', isAuthenticated, isAdmin, new ListOutController().handle)

routes.get(
  '/search-client/:query',
  isAuthenticated,
  new SearchClientController().handle,
)

routes.get(
  '/search-address/:query',
  isAuthenticated,
  new SearchAddressController().handle,
)

routes.get(
  '/order/:clientId',
  isAuthenticated,
  new ListOrderClientController().handle,
)

routes.get(
  '/orders/:id',
  isAuthenticated,
  new FindUniqueOrderControllerv1().handle,
)

routes.get('/v2/orders', isAuthenticated, new ListOrdersController().handle)

routes.get(
  '/v2/orders/organization',
  isAuthenticated,
  new ListOrdersOrganizationController().handle,
)

routes.get(
  '/v2/orders/:id',
  isAuthenticated,
  new FindUniqueOrderController().handle,
)
export { routes }
