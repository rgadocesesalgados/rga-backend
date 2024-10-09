import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { authBearer } from '../authBearer'
import { prismaClient } from '../../../prisma'

let supplierId: string
let headers: { Authorization: string }

beforeAll(async () => {
  await prismaClient.out.deleteMany()

  headers = (await authBearer()).headers

  const supplier = await prismaClient.supplier.create({
    data: { name: 'teste', tel: '44999999999' },
  })

  supplierId = supplier.id
})

afterAll(async () => {
  await prismaClient.supplier.deleteMany()
})
describe('Post Out', () => {
  it('POST endpoint `/out` should return 200', async () => {
    const response = await fetch(
      `http://localhost:3333/out?value=1&supplierId=${supplierId}&date=${Date.now()}`,
      {
        method: 'POST',
        headers,
      }
    )

    expect(response.status).toBe(201)
  })

  it('POST endpoint `/out` should return 400', async () => {
    const response = await fetch('http://localhost:3333/out', {
      method: 'POST',
      headers,
    })

    expect(response.status).toBe(400)

    const response2 = await fetch('http://localhost:3333/out?date=-1', {
      method: 'POST',
      headers,
    })

    expect(response2.status).toBe(400)

    const response3 = await fetch(
      `http://localhost:3333/out?value=1&supplierId=${22}&date=${Date.now()}`,
      {
        method: 'POST',
        headers,
      }
    )

    expect(response3.status).toBe(400)
  })
})
