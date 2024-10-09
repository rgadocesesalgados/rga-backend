import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { authBearer } from '../authBearer'
import { prismaClient } from '../../../prisma'

let headers: { Authorization: string }

const supplier = {
  name: 'teste',
  tel: '44999999999',
  outs: [
    { date: new Date(), value: 1 },
    { date: new Date(), value: 2 },
    { date: new Date(), value: 3 },
  ],
}
beforeAll(async () => {
  await prismaClient.supplier.create({
    data: {
      name: supplier.name,
      tel: supplier.tel,
      outs: {
        create: supplier.outs,
      },
    },
  })
  headers = (await authBearer()).headers
})

afterAll(async () => {
  await prismaClient.supplier.deleteMany()
})

describe('Get Out', () => {
  it('GET endpoint `/out` should return 200', async () => {
    const response = await fetch('http://localhost:3333/out', {
      headers,
    })

    expect(response.status).toBe(200)

    const responseBody = await response.json()

    expect(responseBody).toMatchObject({
      total: 6,
      outs: supplier.outs.map((out) => ({
        id: expect.any(String),
        date: new Date(out.date).getTime(),
        value: out.value,
        supplier: supplier.name,
      })),
    })
  })
})
