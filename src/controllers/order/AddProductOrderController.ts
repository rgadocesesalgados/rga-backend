import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { AddProductOrderService } from '../../services/order/AddProductOrder'

export class AddProductOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const { order_id, product_id } = req.query as {
      order_id: string
      product_id: string
    }
    const { quantity, price } = req.body

    if (!order_id) throw new Error('Order id is required')
    if (!product_id) throw new Error('Product id is required')
    if (!quantity) throw new Error('Quantity is required')

    const addProductOrderService = new AddProductOrderService()

    const orderProduct = await addProductOrderService.execute({
      order_id,
      product_id,
      quantity,
      price,
    })

    return res.json(orderProduct)
  }
}
