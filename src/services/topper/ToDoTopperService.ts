import { prismaClient } from '../../prisma'

interface TopperProps {
  dateInitial: Date
}

interface Tooper {
  id: string
  client_name: string
  date: Date
  hour: string
  name: string
  idade: number
  banner: string
  description: string
  recebido: boolean
}
export class ToDoTopperService {
  async execute({ dateInitial }: TopperProps) {
    const topper = await prismaClient.topper.findMany({
      where: {
        bolo: {
          order: {
            date: {
              gte: dateInitial,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        idade: true,
        tema: true,
        recebido: true,
        banner: true,
        bolo: {
          select: {
            peso: true,
            order: {
              select: {
                date: true,
                hour: true,
                client: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    console.log({ topper })
    return topper.map((topper) => {
      return {
        id: topper.id,
        date: topper.bolo.order.date,
        client_name: topper.bolo.order.client.name,
        name: topper.name,
        idade: topper.idade,
        hour: topper.bolo.order.hour,
        recebido: topper.recebido,
        banner: topper.banner,
      } as Tooper
    })
  }
}
