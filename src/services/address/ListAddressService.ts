import { prismaClient } from '../../prisma'

export class ListAddressService {
  async execute() {
    return await prismaClient.address.findMany()
  }
}
