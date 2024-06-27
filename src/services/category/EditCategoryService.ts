import { prismaClient } from '../../prisma'

export class EditCategoryService {
  async execute(id: string, name: string, priority: number) {
    const categorys = (await prismaClient.category.findMany()).sort(
      (a, b) => a.priority - b.priority
    )

    const existCategory = categorys.find((category) => category.name === name)
    const existCategoryInit = categorys.find(
      (category) => category.priority === 0
    )

    if (!existCategoryInit && priority > 0) {
      throw new Error('As prioridades devem começar em 0')
    }

    const categoryPriority = categorys.find(
      (category) => category.priority === priority
    )

    const categorySelect = categorys.find((category) => category.id === id)

    if (existCategory && existCategory.id !== id) {
      throw new Error('Essa categoria já existe.')
    }

    if (
      priority >= categorys[categorys.length - 1].priority + 2 &&
      categorys[categorys.length - 1].priority == 0
    )
      throw new Error('Prioridade inválida')

    if (
      categorySelect?.priority >= 0 &&
      categorySelect?.priority !== categorys[categorys.length - 1].priority &&
      priority < 0
    ) {
      throw new Error(
        'Para ocultar uma categoria, ela deve estar no final da lista'
      )
    }

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
