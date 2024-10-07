import { prismaClient } from '../../prisma'

export class DeleteSupplierService {
  async execute(id: string) {
    const supplier = await prismaClient.supplier.findUnique({
      where: {
        id,
      },
    })

    if (!supplier) return false

    await prismaClient.supplier.delete({
      where: {
        id,
      },
    })

    return true
  }
}
