import { prismaClient } from '../../prisma'

export class EditCategoryService {
  async execute(name: string, new_name: string) {
    const existCategory = await prismaClient.category.findFirst({
      where: {
        name: new_name,
      },
    })

    if (existCategory) {
      throw new Error('Essa categoria já existe.')
    }
    const category = await prismaClient.category.update({
      where: {
        name,
      },
      data: {
        name: new_name,
      },
    })

    return category
  }
}
