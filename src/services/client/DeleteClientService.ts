import { prismaClient } from '../../prisma'

export class DeleteClientService {
  async execute(id: string) {
    const client = await prismaClient.client.delete({
      where: {
        id,
      },
    })

    return client
  }
}
