import { prismaClient } from '../../prisma'
import { RecheioProps } from './CreateRecheioService'

export class EditRecheioService {
  async execute({
    id,
    name,
    price,
    banner,
    is_pesado,
    to_bento_cake,
  }: RecheioProps & { id: string }) {
    const recheio = await prismaClient.recheio.update({
      where: {
        id,
      },
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
