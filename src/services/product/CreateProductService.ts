import { prismaClient } from '../../prisma'

export interface ProductProps {
  name: string
  price: number
  min_quantity: number
  banner?: string
  category_id?: string
  stock?: number
}
export class CreateProductService {
  async execute({
    name,
    price,
    min_quantity,
    banner,
    category_id,
    stock = 0,
  }: ProductProps) {
    if (!name || !price || !min_quantity) {
      throw new Error('Name, price and min_quantity are required')
    }

    if (!category_id) {
      throw new Error('Categoria não encontrada')
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        min_quantity,
        banner,
        category: {
          connect: {
            id: category_id,
          },
        },
        stock: {
          create: {
            quantity: stock,
          },
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        min_quantity: true,
      },
    })

    return product
  }
}
