import { prismaClient } from '../../prisma'
import { AddressProps } from './CreateAddressService'

interface AddressPropsWithId extends AddressProps {
  id: string
}

export class EditAddressService {
  async execute({ id, ...data }: AddressPropsWithId) {
    const address = await prismaClient.address.update({
      where: {
        id,
      },
      data,
    })
    return address
  }
}
