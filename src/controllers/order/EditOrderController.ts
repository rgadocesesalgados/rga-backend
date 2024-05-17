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
      boloDelete,
      orderProduct,
      cor_forminhas,
      observations,
      delivery,
      address,
      total,
      payment,
      status,
    } = req.body

    const editOrderService = new EditOrderService()

    const order = await editOrderService.execute({
      id,
      client_id,
      date,
      hour,
      bolo,
      boloDelete,
      orderProduct,
      cor_forminhas,
      observations,
      delivery,
      address,
      total,
      payment,
      status,
    })

    return res.json(order)
  }
}
