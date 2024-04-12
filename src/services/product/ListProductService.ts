import { prismaClient } from '../../prisma'

export class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      include: {
        category: true,
        stock: true,
      },
    })

    const productsWithStockAndCategory = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        min_quantity: product.min_quantity,
        banner: product.banner,
        category_name: product.category.name,
        stock: product.stock.quantity,
        category_id: product.category.id,
        stock_id: product.stock.id,
      }
    })
    return productsWithStockAndCategory
  }
}
