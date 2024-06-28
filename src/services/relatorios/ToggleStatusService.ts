import { prismaClient } from '../../prisma'
import { OrderCreate } from '../../types/order'

export class ToggleStatusService {
  async execute(ids: string[], status: OrderCreate['status'] = 'EM_PRODUCAO') {
    await prismaClient.order.updateMany({
      where: { id: { in: ids } },
      data: { status },
    })
  }
}
