import { prismaClient } from '../../prisma'

export class DeleteeRecheioService {
  async execute(bolo_id: string, recheio_id: string) {
    const bolo = await prismaClient.bolo.update({
      where: { id: bolo_id },
      data: { recheio: { disconnect: { id: recheio_id } } },
    })

    return bolo
  }
}
