import { prismaClient } from '../../prisma'

export class CreateCategoryService {
  async execute(name: string, priority: number, boxes: number[]) {
    const existCategory = (await prismaClient.category.findMany()).sort(
      (a, b) => a.priority - b.priority,
    )

    const existCategoryInit = existCategory.find(
      (category) => category.priority === 0,
    )

    if (!existCategoryInit && priority > 0) {
      throw new Error('As prioridades devem iniciar em 0')
    }

    if (
      priority > 0 &&
      priority > existCategory[existCategory.length - 1].priority + 1
    )
      throw new Error(
        `Prioridade deve ser ${
          existCategory[existCategory.length - 1].priority + 1
        } ou menor`,
      )

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
          priority: existCategory[existCategory.length - 1].priority + 1,
        },
      })
    }

    const categorys = await prismaClient.category.create({
      data: {
        name,
        priority,
        boxes,
      },
    })

    return categorys
  }
}
