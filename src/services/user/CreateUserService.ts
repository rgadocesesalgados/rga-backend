import { prismaClient } from '../../prisma'
import { hash } from 'bcrypt'

interface UserProps {
  name: string
  tel: string
  password: string
}

export class CreateUserService {
  async execute({ name, tel, password }: UserProps) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { tel },
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashPassword = await hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        name,
        tel,
        password: hashPassword,
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
