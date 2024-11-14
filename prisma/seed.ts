import { fakerPT_BR as faker } from '@faker-js/faker'

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
    data: Array.from({ length: 100 }).map(() => {
      const rua = faker.location.street().split(' ').reverse().join(' ')
      const numero = +faker.location.buildingNumber()
      const bairro = faker.location.direction()
      const cidade = faker.location.city()
      const ponto_de_referencia = faker.location.secondaryAddress()
      const address_complete = `${rua} - ${numero}, ${bairro}, ${ponto_de_referencia}, ${cidade}`
      const frete_moto = faker.number.int({ min: 5, max: 100 })
      const frete_carro = frete_moto * 2

      return {
        rua,
        numero,
        bairro,
        cidade,
        ponto_de_referencia,
        address_complete,
        frete_carro,
        frete_moto,
      }
    }),
  })
}
async function createClients() {
  const address = await prismaClient.address.findMany()

  await prismaClient.client.createMany({
    data: address.map(({ id }) => {
      const name = faker.person.fullName()
      const tel = faker.phone.number()
      return {
        name,
        tel,
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
