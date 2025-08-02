import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListDeliveryService } from '../../services/delivery/ListDeliveryService'

export class ListDesliveryController {
  async handle(req: RequestWithUser, res: Response) {
    const date = +req.query.date

    const listDesliveryService = new ListDeliveryService()

    const deliveries = await listDesliveryService.execute(new Date(date))

    return res.json(deliveries)
  }
}
