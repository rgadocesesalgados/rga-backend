import { prismaClient } from '../../prisma'
import { CreateOrderProps } from './types'

export class CreateOrderService {
  async execute({
    client_id,
    data: date,
    delivery,
    status,
    total,
    address_id,
    frete,
    cor_da_forminha,
    observations,
    products,
  }: CreateOrderProps) {
    if (!client_id) throw new Error('Cliente é obrigatório.')
    if (!date) throw new Error('Data é obrigatório.')
    if (!status) throw new Error('Status é obrigatório.')
    if (typeof total !== 'number' || total < 0)
      throw new Error('Total é obrigatório.')

    const isDelivery = () => {
      if (delivery) {
        return { address: { connect: { id: address_id } }, type_frete: frete }
      }
      return { type_frete: null }
    }

    const order = await prismaClient.order.create({
      data: {
        client: { connect: { id: client_id } },
        data: new Date(date),
        status,
        total,
        delivery: delivery,
        ...isDelivery(),
        cor_forminhas: cor_da_forminha,
        observations,
      },
    })
    if (products.length > 0) {
      const orderProducts = await prismaClient.orderProduct.createMany({
        data: products.map((product) => ({
          order_id: order.id,
          product_id: product.product_id,
          quantity: product.quantity,
          price: product.price,
        })),
      })
    }
    return order
  }
}
