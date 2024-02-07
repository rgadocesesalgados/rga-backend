import { prismaClient } from '../../prisma'
import { ClientProps } from './CreateClientService'

export class EditClientService {
  async execute({ id, name, tel, address_id }: ClientProps & { id: string }) {
    const clientAlreadyExists = await prismaClient.client.findFirst({
      where: { tel },
    })

    if (!clientAlreadyExists) {
      throw new Error('Client not found')
    }

    const client = await prismaClient.client.update({
      where: {
        id,
      },
      data: {
        name,
        tel,
        address_id,
      },
      include: {
        address: true,
      },
    })

    return client
  }
}
