import { prismaClient } from '../../prisma'

export class RemoveProductService {
  async execute(id: string) {
    const stock = await prismaClient.stock.delete({
      where: {
        product_id: id,
      },
    })

    const product = await prismaClient.product.delete({
      where: {
        id,
      },
    })

    return { product, stock }
  }
}
