import { describe, expect, test } from '@jest/globals'
import { authBearer } from '../authBearer'

describe('GET /api/address', () => {
  test('Search for address', async () => {
    const { headers } = await authBearer()

    const response = await fetch('http://localhost:3333/search-address/84', {
      headers,
    })

    expect(response.status).toBe(200)

    const response2 = await fetch(
      'http://localhost:3333/search-address/Julia',
      {
        headers,
      }
    )

    expect(response2.status).toBe(200)
  })
})
