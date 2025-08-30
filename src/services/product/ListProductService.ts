import { prismaClient } from '../../prisma'
import { sortByAscendingName } from '../../ultils/sortByAscendingName'

export class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      include: {
        category: true,
      },
    })

    const productsWithStockAndCategory = products
      .map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          min_quantity: product.min_quantity,
          banner: product.banner,
          category_name: product.category.name,
          category_id: product.category.id,
        }
      })
      .sort((a, b) => sortByAscendingName(a.name, b.name))
    return productsWithStockAndCategory
  }
}
