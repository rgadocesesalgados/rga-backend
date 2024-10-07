import { Supplier } from '../../controllers/supplier/post'
import { prismaClient } from '../../prisma'

export class CreateSupplierService {
  async execute({ name, tel }: Supplier) {
    const supplier = await prismaClient.supplier.create({
      data: { name, tel },
      select: { id: true },
    })

    return supplier
  }
}
