import { prismaClient } from '../../prisma'

export class CreateCategoryService {
  async execute(name: string) {
    const categorys = await prismaClient.category.create({
      data: {
        name,
      },
    })

    return categorys
  }
}
