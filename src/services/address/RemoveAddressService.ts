import { prismaClient } from '../../prisma'

export class RemoveAddressService {
  async execute(id: string) {
    const addressIsUsedByOrder = await prismaClient.order.findMany({
      where: {
        address_id: id,
      },
    })

    const addressIsUsedByClient = await prismaClient.client.findMany({
      where: {
        address_id: id,
      },
    })

    if (addressIsUsedByOrder.length > 0) {
      throw new Error('Endereço não pode ser excluído por estar em um pedido')
    }

    if (addressIsUsedByClient.length > 0) {
      throw new Error('Endereço não pode ser excluído por estar em um cliente')
    }

    const address = await prismaClient.address.delete({
      where: {
        id,
      },
    })
    return address
  }
}
