import { prismaClient } from '../../prisma'

export class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        min_quantity: true,
        banner: true,
        category: {
          select: { name: true },
        },
        stock: {
          select: {
            quantity: true,
          },
        },
      },
    })
    return products
  }
}
