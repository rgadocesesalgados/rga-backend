import { prismaClient } from '../../prisma'

export class ToggleStatusService {
  async execute(ids: string[]) {
    await prismaClient.order.updateMany({
      where: { id: { in: ids } },
      data: { status: 'EM_PRODUCAO' },
    })
  }
}
