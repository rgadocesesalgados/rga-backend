import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { prismaClient } from '../../../prisma'
import { authBearer } from '../authBearer'

let headers: { Authorization: string }
let outId: string

beforeAll(async () => {
  await prismaClient.supplier.deleteMany()

  const supplier = await prismaClient.supplier.create({
    data: { name: 'teste', tel: '44999999999' },
  })

  const out = await prismaClient.out.create({
    data: { supplier_id: supplier.id, value: 1, date: new Date() },
    select: { id: true },
  })

  outId = out.id
  headers = (await authBearer()).headers
})

afterAll(async () => {
  await prismaClient.supplier.deleteMany()
})

describe('Delete Out', () => {
  it('DELETE endpoint `/out` should return 200', async () => {
    const response = await fetch(`http://localhost:3333/out/${outId}`, {
      method: 'DELETE',
      headers,
    })

    expect(response.status).toBe(200)
  })
})
