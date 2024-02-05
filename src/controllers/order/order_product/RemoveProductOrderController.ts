import { Response } from 'express'
import { RequestWithUser } from '../../../middlewares/isAuthenticated'
import { RemoveProductOrderService } from '../../../services/order/order_product/RemoveProductOrderService'

export class RemoveProductOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const orderProduct_id = req.query.orderProduct_id as string

    const removeProductOrderService = new RemoveProductOrderService()

    const orderProduct = await removeProductOrderService.execute(
      orderProduct_id
    )

    return res.json(orderProduct)
  }
}
