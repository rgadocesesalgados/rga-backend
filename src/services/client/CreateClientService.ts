import { prismaClient } from '../../prisma'
import { AddressProps } from '../address/CreateAddressService'

export interface ClientProps {
  name: string
  tel: string
  address_id: string
}

export class CreateClientService {
  async execute({ name, tel, address_id }: ClientProps) {
    
    const clientAlreadyExists = await prismaClient.client.findFirst({
      where: { tel },
    })

    if (clientAlreadyExists) {
      throw new Error('Esse cliente ja existe.')
    }

    const client = await prismaClient.client.create({
      data: {
        name,
        tel,
        address_id,
      },
    })

    return client
  }
}
