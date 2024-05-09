import { prismaClient } from '../../prisma'
import { ProductProps } from './CreateProductService'

export class EditeProductService {
  async execute({
    id,
    name,
    price,
    min_quantity,
    banner,
    category_id,
  }: ProductProps & { id: string }) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    })

    if (!categoryAlreadyExists) throw new Error('Categoria não encontrada')

    console.log({ id, name, price, min_quantity, banner, category_id })

    const product = await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        min_quantity,
        banner,
        category: { connect: { id: category_id } },
      },
    })

    return product
  }
}
