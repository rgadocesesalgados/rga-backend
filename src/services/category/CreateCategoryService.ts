import { prismaClient } from '../../prisma'

export class CreateCategoryService {
  async execute(name: string, priority: number) {
    const existCategory = await prismaClient.category.findMany()

    if (priority > existCategory.length)
      throw new Error(`Prioridade deve ser ${existCategory.length} ou menor`)

    if (priority < 0) throw new Error('Prioridade deve ser maior que 0')

    if (existCategory.find((category) => category.name === name)) {
      throw new Error('Essa categoria já existe')
    }

    const categoryPriority = await prismaClient.category.findFirst({
      where: {
        priority,
      },
    })

    if (categoryPriority) {
      await prismaClient.category.update({
        where: {
          id: categoryPriority.id,
        },
        data: {
          priority: existCategory.length,
        },
      })
    }

    const categorys = await prismaClient.category.create({
      data: {
        name,
        priority,
      },
    })

    return categorys
  }
}
