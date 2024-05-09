import { prismaClient } from '../../prisma'

export class ListRecheioService {
  async execute() {
    const recheio = await prismaClient.recheio.findMany()
    return recheio.sort((a, b) => a.name.localeCompare(b.name))
  }
}
