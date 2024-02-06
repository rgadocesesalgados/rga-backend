import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveOrderService } from '../../services/order/RemoveOrderService'

export class RemoveOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const order_id = req.query.order_id as string

    if (!order_id) throw new Error('Order id is required')

    const removeOrderService = new RemoveOrderService()

    const order = await removeOrderService.execute(order_id)

    return res.json(order)
  }
}
