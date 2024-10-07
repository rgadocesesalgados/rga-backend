import { beforeAll, describe, expect, it } from '@jest/globals'
import { authBearer } from '../authBearer'
import { prismaClient } from '../../../prisma'

const suppliers = [
  {
    name: 'Vanusa Pereira',
    tel: '12345678910',
  },
  {
    name: 'José Honorio',
    tel: '12345678920',
  },
]

beforeAll(async () => {
  await prismaClient.supplier.deleteMany()

  await prismaClient.supplier.createMany({
    data: suppliers,
  })
})

describe('Get Suppliers', () => {
  it('GET endpoint `/supplier` should return 200', async () => {
    const { headers } = await authBearer()

    const response = await fetch('http://localhost:3333/supplier', {
      headers,
    })

    expect(response.status).toBe(200)

    const responseBody = await response.json()

    expect(responseBody).toHaveLength(2)

    expect(responseBody).toMatchObject(suppliers)
  })
})
