import { Request, Response } from 'express'
import { FindUniqueOrderService } from '../../services/orders/FindUniqueOrderService'

export class FindUniqueOrderController {
  async handle(req: Request, res: Response) {
    const id = req.params.id

    const findUniqueOrderService = new FindUniqueOrderService()

    const order = await findUniqueOrderService.execute(id)

    res.json(order)
  }
}
