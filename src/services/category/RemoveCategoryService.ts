import { prismaClient } from '../../prisma'

export class RemoveCategoryService {
  async execute(id: string) {
    const existProductInCategory = await prismaClient.product.findMany({
      where: {
        category: {
          id,
        },
      },
    })

    if (existProductInCategory.length > 0) {
      throw new Error('Essa categoria contém produtos')
    }

    const category = await prismaClient.category.delete({
      where: {
        id,
      },
    })

    return category
  }
}
