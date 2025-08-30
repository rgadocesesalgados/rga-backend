import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateOrderService } from '../../services/order/CreateOrderService'
import { OrderCreate } from '../../types/order/create'

export class CreateOrderController {
  async handle(req: RequestWithUser, res: Response) {
    const {
      date,
      hour,
      cakes,
      boxes,
      products,
      cor_forminhas,
      observations,
      delivery,
      address,
      total,
      status,
      payments,
    } = req.body

    const { address_id, client_id } = req.query as {
      address_id: string
      client_id: string
    }

    const isDelivery = () => {
      if (delivery) {
        if (!address_id) throw new Error('Endereço de entrega é obrigatório')
        if (!address.type_frete) throw new Error('Tipo de Frete é obrigatório')
        if (!address.value_frete)
          throw new Error('Valor de Frete é obrigatório')

        return {
          delivery: true,
          type_frete: address.type_frete,
          value_frete: address.value_frete,
          address_id,
        }
      } else {
        return {
          delivery: false,
          type_frete: null,
          value_frete: null,
          address_id: null,
        }
      }
    }

    const order: OrderCreate = {
      client_id,
      date,
      hour,
      cakes: cakes ? cakes : [],
      products: products ? products : [],
      boxes: boxes ? boxes : [],
      cor_forminhas,
      observations,
      ...isDelivery(),
      total,
      status,
      payments,
    }

    const createOrderService = new CreateOrderService()

    const orderCreated = await createOrderService.execute(order)

    return res.json(orderCreated)
  }
}
