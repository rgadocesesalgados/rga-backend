import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { FindUniqueOrderServices } from '../../services/order/FindUniqueOrderServices'

export class FindUniqueOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const id = req.params.id

    const findUniqueOrderService = new FindUniqueOrderServices()

    const orders = await findUniqueOrderService.execute(id)

    return res.json(orders)
  }
}
