import { prismaClient } from '../../prisma'

export class EditCategoryService {
  async execute(id: string, name: string, priority: number) {
    const existCategory = await prismaClient.category.findFirst({
      where: {
        name,
      },
    })

    if (existCategory && existCategory.id !== id) {
      throw new Error('Essa categoria já existe.')
    }

    const category = await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name,
        priority,
      },
    })

    return category
  }
}
