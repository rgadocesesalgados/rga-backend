import { prismaClient } from '../../prisma'

export interface ProductProps {
  name: string
  price: number
  min_quantity: number
  banner?: string
  category?: string
  stock?: number
}
export class CreateProductService {
  async execute({
    name,
    price,
    min_quantity,
    banner,
    category,
    stock = 0,
  }: ProductProps) {
    if (!name || !price || !min_quantity) {
      throw new Error('Name, price and min_quantity are required')
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        min_quantity,
        banner,
        category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
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
