import { hash } from 'bcrypt'
import { prismaClient } from './src/prisma'

const adminCheckExists = async () => {
  const userAlreadyExists = await prismaClient.user.findFirst({
    where: { tel: process.env.ADMIN_TEL },
    select: {
      id: true,
      name: true,
      tel: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  })

  return userAlreadyExists
}

const createUserAdmin = async () => {
  const hashPassword = await hash(process.env.ADMIN_PASSWORD, 10)
  const user = await prismaClient.user.create({
    data: {
      name: 'Admin',
      tel: '44998692094',
      password: hashPassword,
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
      tel: true,
      role: true,
    },
  })

  return user
}

const Main = async () => {
  if (!process.env.ADMIN_TEL || !process.env.ADMIN_PASSWORD) {
    console.log('Env ADMIN_TEL e ADMIN_PASSWORD devem ser definidas')
    return
  }

  console.log('Verificando se o admin existe...')

  const userAlreadyExists = await adminCheckExists()

  if (!userAlreadyExists) {
    console.log('Criando o admin...')

    try {
      const user = await createUserAdmin()
      console.log('Admin criado com sucesso!')
      console.log(user)
      return
    } catch (error) {
      console.log('Erro ao criar o admin')

      console.log(error)
      return
    }
  }

  console.log('Admin existe')
  console.log(userAlreadyExists)
}

Main()
