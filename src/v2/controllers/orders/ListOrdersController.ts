import { Request, Response } from 'express'
import { ListOrdersService } from '../../services/orders/ListOrdersService'

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const { query, take, page } = req.query

    const listOrdersService = new ListOrdersService()

    const orders = await listOrdersService.execute(
      query as string,
      +take,
      +page,
    )

    res.json(orders)
  }
}
