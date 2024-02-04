import { prismaClient } from '../../prisma'

export interface RecheioProps {
  name: string
  price: number
  banner: string
  is_pesado: boolean
  to_bento_cake: boolean
}
export class CreateRecheioService {
  async execute({
    name,
    price,
    banner,
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
      },
    })

    return recheio
  }
}
