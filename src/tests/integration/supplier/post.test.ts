import { beforeAll, describe, expect, it } from '@jest/globals'
import { prismaClient } from '../../../prisma'
import { authBearer } from '../authBearer'

beforeAll(async () => await prismaClient.supplier.deleteMany())

describe('Post Suppliers', () => {
  it('POST endpoint `/supplier` should return 200', async () => {
    const { headers } = await authBearer()

    const supplier = {
      name: 'teste',
      tel: '12345678910',
    }

    const response = await fetch(
      `http://localhost:3333/supplier?name=${supplier.name}&tel=${supplier.tel}`,
      {
        method: 'POST',
        headers,
      }
    )

    const responseBody = await response.json()

    expect(response.status).toBe(201)

    expect(responseBody).toHaveProperty('id')
  })

  it('POST endpoint `/supplier` should return 400', async () => {
    const { headers } = await authBearer()

    const response = await fetch('http://localhost:3333/supplier', {
      method: 'POST',
      headers,
    })

    expect(response.status).toBe(400)
  })
})
