import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListOrderService } from '../../services/order/ListOrderServices'

export class ListOrderController {
  async handle(_req: RequestWithUser, res: Response) {
    const listOrderService = new ListOrderService()

    const orders = await listOrderService.execute()

    return res.json(orders)
  }
}
