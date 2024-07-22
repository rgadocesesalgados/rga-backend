import { prismaClient } from '../../prisma'

export interface RecheioProps {
  name: string
  price: number
  banner: string
  price_fixed: boolean
  is_pesado: boolean
  to_bento_cake: boolean
}
export class CreateRecheioService {
  async execute({
    name,
    price,
    banner,
    price_fixed,
    is_pesado,
    to_bento_cake,
  }: RecheioProps) {
    const recheio = await prismaClient.recheio.create({
      data: {
        name,
        price,
        banner,
        is_pesado,
        to_bento_cake,
        price_fixed,
      },
    })

    return recheio
  }
}
