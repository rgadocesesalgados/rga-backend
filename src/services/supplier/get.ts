import { prismaClient } from '../../prisma'

export class ListSupplierService {
  async execute() {
    const suppliers = await prismaClient.supplier.findMany()
    return suppliers
  }
}
