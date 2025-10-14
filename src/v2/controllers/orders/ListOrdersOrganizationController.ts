import { Request, Response } from 'express'
import { ListOrdersService } from '../../services/orders/ListOrdersService'
import { ListOrdersOrganizationService } from '../../services/orders/ListOrdersOrganizationService'

export class ListOrdersOrganizationController {
  async handle(req: Request, res: Response) {
    const listOrdersOrganizationService = new ListOrdersOrganizationService()

    const orders = await listOrdersOrganizationService.execute()

    res.json(orders)
  }
}
