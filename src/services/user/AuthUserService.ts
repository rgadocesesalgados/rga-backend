import { compare } from 'bcrypt'
import { prismaClient } from '../../prisma'
import { sign } from 'jsonwebtoken'

export class AuthUserService {
  async execute({ tel, password }: { tel: string; password: string }) {
    const user = await prismaClient.user.findFirst({
      where: {
        tel,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Password does not match')
    }

    const token = sign(
      {
        name: user.name,
        tel: user.tel,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '500d',
      }
    )
    return {
      id: user.id,
      name: user.name,
      tel: user.tel,
      token,
    }
  }
}
