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

    const categorys = (await prismaClient.category.findMany()).sort(
      (a, b) => a.priority - b.priority
    )
    const categoryPriority = categorys.find((ctgry) => ctgry.id === id)

    const categoryLast = categorys[categorys.length - 1]

    console.log({ categoryLast })

    if (categoryPriority?.priority !== categorys.length - 1) {
      await prismaClient.category.update({
        where: {
          id: categoryLast.id,
        },
        data: {
          priority: categoryPriority?.priority,
        },
      })
    }

    const category = await prismaClient.category.delete({
      where: {
        id,
      },
    })

    return category
  }
}
