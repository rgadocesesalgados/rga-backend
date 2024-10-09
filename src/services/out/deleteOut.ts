import { prismaClient } from '../../prisma'

export class DeleteOutService {
  async execute(id: string) {
    return await prismaClient.out.delete({
      where: {
        id,
      },
      select: { id: true },
    })
  }
}
