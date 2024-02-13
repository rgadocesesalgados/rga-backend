import { prismaClient } from '../../prisma'

export class CreateCategoryService {
  async execute(name: string) {
    const existCategory = await prismaClient.category.findFirst({
      where: {
        name,
      },
    })

    if (existCategory) {
      throw new Error('Essa categoria já existe')
    }
    const categorys = await prismaClient.category.create({
      data: {
        name,
      },
    })

    return categorys
  }
}
