import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateOrderService } from '../../services/order/CreateOrderService'

export class CreateOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const client_id = req.query.client_id as string

    const createOrderService = new CreateOrderService()

    const order = await createOrderService.execute(client_id)

    return res.json(order)
  }
}
