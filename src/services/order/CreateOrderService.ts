import { prismaClient } from '../../prisma'
import { AddressProps } from '../client/CreateClientService'

export interface OrderProps {
  data: string
  delivery: boolean
  total: number
  payment: 'DEBIT' | 'CREDIT' | 'PIX' | 'MONEY' | 'DUPLICATE'
  draft: boolean
  client_id: string
  address_id: string
  address?: AddressProps
}

export class CreateOrderService {
  async execute(client_id: string) {
    const order = await prismaClient.order.create({
      data: {
        client_id,
      },
    })

    return order
  }
}
