import { prismaClient } from '../../prisma'

export class ListTopperServices {
  async execute() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const nextDay = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    nextDay.setHours(23, 59, 59, 0)

    const toppers = await prismaClient.topper.findMany({
      where: {
        bolo: {
          order: {
            date: {
              gte: today,
              lt: nextDay,
            },
            status: 'ANOTADO'
          },
        },
      },
      include: {
        bolo: {
          include: {
            order: {
              select: {
                client: {
                  select: { name: true },
                },
                date: true,
                hour: true,
              },
            },
          },
        },
      },
    })

    return toppers.map(
      ({
        id,
        bolo: {
          order: { date, hour, client },
        },
        name,
        idade,
        banner,
        tema,
        description,
      }) => {
        return {
          id,
          client_name: client.name,
          tema,
          name,
          idade,
          date,
          hour,
          banner,
          description,
        }
      }
    )
  }
}
