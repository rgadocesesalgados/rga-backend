import { Response } from 'express'
import { RequestWithUser } from '../../../middlewares/isAuthenticated'
import { ListOrderClientService } from '../../../services/order/client/ListOrderClientServices'

export class ListOrderClientController {
  async handle(req: RequestWithUser, res: Response) {
    const listOrderClientService = new ListOrderClientService()

    const orders = await listOrderClientService.execute(req.params.clientId)

    return res.json(orders)
  }
}
