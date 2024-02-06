import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import {
  EditeOrderService,
  OrderProps,
} from '../../services/order/EditeOrderService'

export class EditOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const order_id = req.query.order_id as string

    if (!order_id) throw new Error('Order id is required')

    const {
      client_id,
      data,
      cor_forminhas,
      observations,
      delivery,
      payment,
      total,
      draft,
      retired,
      paid,
    } = req.body as OrderProps

    const editOrderService = new EditeOrderService()

    const order = await editOrderService.execute({
      id: order_id,
      client_id,
      data,
      cor_forminhas,
      observations,
      delivery,
      payment,
      total,
      draft,
      retired,
      paid,
    })

    return res.json(order)
  }
}
