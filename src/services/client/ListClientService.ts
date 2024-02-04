import { prismaClient } from '../../prisma'

export class ListClientService {
  async execute() {
    return await prismaClient.client.findMany()
  }
}
