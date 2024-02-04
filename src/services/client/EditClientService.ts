import { prismaClient } from '../../prisma'
import { ClientProps } from './CreateClientService'

export class EditClientService {
  async execute({
    id,
    name,
    tel,
    address: { rua, numero, bairro, ponto_de_referencia },
  }: ClientProps & { id: string }) {
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
        address: {
          update: {
            rua,
            numero,
            bairro,
            ponto_de_referencia,
          },
        },
      },
      include: {
        address: true,
      },
    })

    return client
  }
}
