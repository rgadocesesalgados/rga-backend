import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditOrderService } from '../../services/order/EditOrderService'

export class EditOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const {
      id,
      client_id,
      date,
      hour,
      bolo,
      orderProduct,
      cor_forminhas,
      observations,
      delivery,
      address,
      total,
      payment,
      status,
      boxes,
    } = req.body

    const editOrderService = new EditOrderService()

    const order = await editOrderService.execute({
      id,
      client_id,
      date,
      hour,
      bolo,
      orderProduct,
      cor_forminhas,
      observations,
      delivery,
      address: delivery ? address : {},
      total,
      payment,
      status,
      boxes,
    })

    return res.json(order)
  }
}
