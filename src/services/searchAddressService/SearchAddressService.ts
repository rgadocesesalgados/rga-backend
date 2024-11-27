import { prismaClient } from '../../prisma'

export class SearchAddressService {
  async execute(query: string) {
    const address = await prismaClient.address.findMany({
      select: {
        id: true,
        address_complete: true,
        frete_carro: true,
        frete_moto: true,
      },
      take: 10,
      where: {
        OR: [
          {
            id: query,
          },

          {
            address_complete: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return address
  }
}
