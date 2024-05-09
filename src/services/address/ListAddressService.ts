import { prismaClient } from '../../prisma'
import { sortByAscendingName } from '../../ultils/sortByAscendingName'

export class ListAddressService {
  async execute() {
    const address = await prismaClient.address.findMany({
      select: {
        id: true,
        rua: true,
        numero: true,
        bairro: true,
        ponto_de_referencia: true,
        cidade: true,
        frete_moto: true,
        frete_carro: true,
        address_complete: true,
      },
    })
    return address.sort((a, b) =>
      sortByAscendingName(a.address_complete, b.address_complete)
    )
  }
}
