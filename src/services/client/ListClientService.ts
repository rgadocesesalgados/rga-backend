import { prismaClient } from '../../prisma'

export class ListClientService {
  async execute() {
    return await prismaClient.client.findMany({
      select: {
        id: true,
        name: true,
        tel: true,
        address_id: true,
        address: {
          select: {
            rua: true,
            numero: true,
            bairro: true,
            ponto_de_referencia: true,
            cidade: true,
          },
        },
      },
    })
  }
}
