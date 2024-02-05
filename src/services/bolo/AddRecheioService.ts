import { prismaClient } from '../../prisma'

export class AddRecheioService {
  async execute(bolo_id: string, recheio_id: string) {
    const recheio = await prismaClient.bolo.update({
      where: {
        id: bolo_id,
      },
      data: {
        recheio: {
          connect: {
            id: recheio_id,
          },
        },
      },
    })

    return recheio
  }
}
