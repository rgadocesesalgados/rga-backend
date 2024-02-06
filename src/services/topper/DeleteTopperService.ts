import { prismaClient } from '../../prisma'

export class DeleteTopperService {
  async execute(topper_id: string) {
    const topper = await prismaClient.topper.delete({
      where: { id: topper_id },
    })
    return topper
  }
}
