import { prismaClient } from '../../prisma'
import { ProductProps } from './CreateProductService'

export class EditeProductService {
  async execute({
    id,
    name,
    price,
    min_quantity,
    banner,
    category,
    stock,
  }: ProductProps & { id: string }) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: category,
      },
    })

    if (!categoryAlreadyExists) throw new Error('Category not found')

    const product = await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        min_quantity,
        banner,
        category_name: category,
        stock: {
          update: {
            quantity: stock,
          },
        },
      },
    })

    return product
  }
}
