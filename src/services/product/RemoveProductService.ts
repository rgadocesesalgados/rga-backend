import { prismaClient } from '../../prisma'

export class RemoveProductService {
  async execute(id: string) {
    const product = await prismaClient.product.delete({
      where: {
        id,
      },
    })

    return product
  }
}
