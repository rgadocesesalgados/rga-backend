import { prismaClient } from '../../prisma'

export interface ClientProps {
  name: string
  tel: string
  address: AddressProps
}

export interface AddressProps {
  rua: string
  numero: number
  bairro: string
  ponto_de_referencia: string
}

export class CreateClientService {
  async execute({
    name,
    tel,
    address: { rua, numero, bairro, ponto_de_referencia },
  }: ClientProps) {
    if (!name || !tel || !rua || !numero || !bairro || !ponto_de_referencia) {
      throw new Error('All fields are required')
    }

    const clientAlreadyExists = await prismaClient.client.findFirst({
      where: { tel },
    })

    if (clientAlreadyExists) {
      throw new Error('Client already exists')
    }

    const client = await prismaClient.client.create({
      data: {
        name,
        tel,
        address: {
          create: {
            rua,
            numero,
            bairro,
            ponto_de_referencia,
          },
        },
      },
    })

    return client
  }
}
