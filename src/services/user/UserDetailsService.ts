import { prismaClient } from '../../prisma'

export class UserDetailsService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        tel: true,
      },
    })
    return user
  }
}
