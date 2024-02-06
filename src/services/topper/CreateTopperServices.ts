import { prismaClient } from '../../prisma'

export interface TopperProps {
  bolo_id: string
  tema: string
  name: string
  idade: number
  price: number
  description: string
  banner: string
}

export class CreateTopperService {
  async execute({
    bolo_id,
    tema,
    name,
    idade,
    price,
    description,
    banner,
  }: TopperProps) {
    const topper = await prismaClient.bolo.update({
      where: { id: bolo_id },
      data: {
        topper: {
          create: {
            tema,
            name,
            idade,
            price,
            description,
            banner,
          },
        },
      },
      include: {
        topper: true,
      },
    })

    return topper
  }
}
