import { prismaClient } from '../../prisma'

export class ListRecheioService {
  async execute() {
    return await prismaClient.recheio.findMany()
  }
}
