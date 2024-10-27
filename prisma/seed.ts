import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'

const prismaClient = new PrismaClient()

main()
  .catch((e) => console.log(e))
  .finally(() => prismaClient.$disconnect())

async function main() {
  await createUserAdmin()

  await createAdress()

  await createClients()

  await crateRecheios()
}

async function crateRecheios() {
  await prismaClient.recheio.createMany({
    data: [
      {
        name: 'Morango',
        price: 50,
        is_pesado: true,
        price_fixed: true,
        to_bento_cake: false,
      },
      {
        name: 'Baunilha',
        price: 34,
        to_bento_cake: true,
      },
    ],
  })
}

async function createAdress() {
  return await prismaClient.address.createMany({
    data: [
      {
        rua: 'Av. Brigadeiro Faria Lima',
        numero: 1000,
        bairro: 'Jardim Paulistano',
        cidade: 'São Paulo',
        ponto_de_referencia: 'Casa',
      },

      {
        rua: 'Av. Brigadeiro Faria Lima',
        numero: 1000,
        bairro: 'Jardim Paulistano',
        cidade: 'São Paulo',
        ponto_de_referencia: 'Casa',
      },

      {
        rua: 'Av. Brigadeiro Faria Lima',
        numero: 1000,
        bairro: 'Jardim Paulistano',
        cidade: 'São Paulo',
        ponto_de_referencia: 'Casa',
      },
    ],
  })
}
async function createClients() {
  const address = await prismaClient.address.findMany()
  const clients = ['João', 'Maria', 'Pedro']

  await prismaClient.client.createMany({
    data: address.map(({ id }, index) => {
      return {
        name: clients[index],
        tel: index.toString(),
        address_id: id,
      }
    }),
  })
}

async function createUserAdmin() {
  exec('npm run setAdmin:dev', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}
