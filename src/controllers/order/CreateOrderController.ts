import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateOrderService } from '../../services/order/CreateOrderService'
import { CreateOrderProps } from '../../services/order/types'

export class CreateOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const { client_id, address_id } = req.query as Pick<
      CreateOrderProps,
      'client_id' | 'address_id'
    >
    const {
      data,
      cor_da_forminha,
      delivery,
      frete,
      observations,
      total,
      status,
      products,
    } = req.body as Omit<CreateOrderProps, 'client_id' | 'address_id'>

    const createOrderService = new CreateOrderService()

    const order = await createOrderService.execute({
      client_id,
      data,
      cor_da_forminha,
      delivery,
      observations,
      total,
      address_id,
      frete,
      status,
      products,
    })

    return res.json(order)
  }
}
