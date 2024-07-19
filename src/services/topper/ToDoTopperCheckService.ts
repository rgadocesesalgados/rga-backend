import { prismaClient } from '../../prisma'

export class ToDoTopperCheckService {
  async execute({ ids }: { ids: string[] }) {
    const result = await prismaClient.topper.updateMany({
      where: { id: { in: ids } },
      data: { recebido: true },
    })

    return result
  }
}
