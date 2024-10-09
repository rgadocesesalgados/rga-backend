import { Out } from '../../controllers/out/post'
import { prismaClient } from '../../prisma'

export class CreateOut {
  async execute({ supplierId, date, value }: Out) {
    const supplier = await prismaClient.supplier.count({
      where: { id: supplierId },
    })

    if (!supplier) {
      throw new Error('O fornecedor não pode ter mais de um pedido')
    }

    const out = await prismaClient.out.create({
      data: {
        supplier_id: supplierId,
        date: new Date(date),
        value,
      },
      select: { id: true },
    })

    return out
  }
}
