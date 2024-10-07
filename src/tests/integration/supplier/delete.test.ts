import { beforeAll, describe, expect, it } from '@jest/globals'
import { prismaClient } from '../../../prisma'
import { authBearer } from '../authBearer'
import { randomUUID } from 'node:crypto'

const uuid = randomUUID()

beforeAll(async () => {
  await prismaClient.supplier.create({
    data: { name: 'teste', tel: '44999999999', id: uuid },
  })
})

describe('Delete Suppliers', () => {
  it('DELETE endpoint `/supplier` should return 200', async () => {
    const { headers } = await authBearer()

    const response = await fetch(`http://localhost:3333/supplier/${uuid}`, {
      method: 'DELETE',
      headers,
    })

    expect(response.status).toBe(200)
  })

  it('DELETE endpoint `/supplier` should return 410', async () => {
    const { headers } = await authBearer()

    const id2 = randomUUID()
    const response = await fetch(`http://localhost:3333/supplier/${id2}`, {
      method: 'DELETE',
      headers,
    })

    expect(response.status).toBe(410)
  })
})
