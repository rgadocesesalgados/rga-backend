import { prismaClient } from '../../prisma'

export class EditCategoryService {
  async execute(id: string, name: string, priority: number) {
    const categorys = await prismaClient.category.findMany()

    const existCategory = categorys.find((category) => category.name === name)
    const categoryPriority = categorys.find(
      (category) => category.priority === priority
    )
    const categorySelect = categorys.find((category) => category.id === id)

    if (existCategory && existCategory.id !== id) {
      throw new Error('Essa categoria já existe.')
    }

    if (priority >= categorys.length) throw new Error('Prioridade inválida')

    if (priority < 0) throw new Error('Prioridade deve ser 0 ou maior')

    if (categoryPriority) {
      await prismaClient.category.update({
        where: {
          id: categoryPriority.id,
        },
        data: {
          priority: categorySelect?.priority,
        },
      })
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
