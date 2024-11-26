import { prismaClient } from '../../prisma'

export class SearchClientService {
  async execute(query: string) {
    const clients = await prismaClient.client.findMany({
      select: { name: true, id: true, tel: true },
      take: 10,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            tel: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            id: query,
          },
        ],
      },
    })

    return clients
  }
}
