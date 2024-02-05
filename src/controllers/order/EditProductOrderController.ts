import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditProductOrderService } from '../../services/order/EditProductOrderService'

export class EditProductOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const { order_id, orderProduct_id } = req.query as {
      order_id: string
      orderProduct_id: string
    }

    const { quantity, price } = req.body

    if (!order_id) throw new Error('Order id is required')
    if (!orderProduct_id) throw new Error('Order product id is required')

    const editProductOrderService = new EditProductOrderService()

    const orderProduct = await editProductOrderService.execute({
      order_id,
      orderProduct_id,
      quantity,
      price,
    })

    return res.json(orderProduct)
  }
}
