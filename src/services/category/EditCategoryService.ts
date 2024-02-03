import { prismaClient } from '../../prisma'

export class EditCategoryService {
  async execute(name: string, new_name: string) {
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
