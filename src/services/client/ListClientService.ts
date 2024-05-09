import { prismaClient } from '../../prisma'
import { sortByAscendingName } from '../../ultils/sortByAscendingName'

export class ListClientService {
  async execute() {
    const clients = await prismaClient.client.findMany({
      select: {
        id: true,
        name: true,
        tel: true,
        address_id: true,
        address: {
          select: {
            address_complete: true,
          },
        },
      },
    })

    const clientsWithAddress = clients.map((client) => {
      return {
        id: client.id,
        name: client.name,
        tel: client.tel,
        address: client.address.address_complete,
        address_id: client.address_id,
      }
    })
    return clientsWithAddress.sort((a, b) =>
      sortByAscendingName(a.name, b.name)
    )
  }
}
