import { prismaClient } from '../../prisma'

export interface OrderProps {
  client_id: string
  data: string
  cor_forminhas: string
  observations: string
  delivery: boolean
  payment: 'DEBIT' | 'CREDIT' | 'PIX' | 'MONEY' | 'DUPLICATE'
  total: number
  address_id: string
  draft: boolean
  retired: boolean
  paid: boolean
}
export class EditeOrderService {
  async execute({
    id,
    client_id,
    data,
    cor_forminhas,
    observations,
    delivery,
    payment,
    total,
    address_id,
    draft,
    retired,
    paid,
  }: OrderProps & { id: string }) {
    const order = await prismaClient.order.update({
      where: { id },
      data: {
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
        address_id: delivery ? address_id : null,
      },
    })

    return order
  }
}
