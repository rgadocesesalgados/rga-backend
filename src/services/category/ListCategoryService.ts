import { prismaClient } from '../../prisma'
import { sortByAscendingName } from '../../ultils/sortByAscendingName'

export class ListCategoryService {
  async execute() {
    const categorys = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
        priority: true,
        boxes: true,
      },
    })
    return categorys.sort((a, b) => a.priority - b.priority)
  }
}
