import { prismaClient } from '../../prisma'

export class ListAddressService {
  async execute() {
    return await prismaClient.address.findMany({
      select: {
        id: true,
        rua: true,
        numero: true,
        bairro: true,
        ponto_de_referencia: true,
        cidade: true,
        address_complete: true,
        frete_moto: true,
        frete_carro: true,
      },
    })
  }
}
