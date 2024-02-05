import { prismaClient } from '../../prisma'

export class CreateBoloService {
  async execute(order_id: string) {
    const bolo = await prismaClient.bolo.create({
      data: {
        order_id,
      },
    })
    return bolo
  }
}
