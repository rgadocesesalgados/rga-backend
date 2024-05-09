import { prismaClient } from '../../prisma'

export class RemoveProductService {
  async execute(id: string) {
    console.log({ id })

    const existProductInOrder = await prismaClient.orderProduct.findFirst({
      where: {
        product_id: id,
      },
    })

    if (existProductInOrder) {
      throw new Error('Esse produto contém pedidos')
    }

    const product = await prismaClient.product.delete({
      where: {
        id,
      },
    })

    return product
  }
}
