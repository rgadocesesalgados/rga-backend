import { prismaClient } from '../../prisma'

export class RemoveRecheioService {
  async execute(id: string) {
    const recheio = await prismaClient.recheio.delete({
      where: {
        id,
      },
    })

    return recheio
  }
}
