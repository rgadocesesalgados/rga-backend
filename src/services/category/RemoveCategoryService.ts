import { prismaClient } from '../../prisma'

export class RemoveCategoryService {
  async execute(name: string) {
    console.log(name)
    const category = await prismaClient.category.delete({
      where: {
        name,
      },
    })

    return category
  }
}
