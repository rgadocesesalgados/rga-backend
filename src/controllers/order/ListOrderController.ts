import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListOrderService } from '../../services/order/ListOrderServices'

export class ListOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const all = req.query?.all === 'true'

    const listOrderService = new ListOrderService()

    const orders = await listOrderService.execute(all)

    return res.json(orders)
  }
}
