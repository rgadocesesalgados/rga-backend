import { describe, expect, test } from '@jest/globals'

interface Tooper {
  id: string
  client_name: string
  date: Date
  peso: string
  hour: string
  tema: string
  name: string
  idade: number
  banner: string
  description: string
}

describe('Get Toppers', () => {
  test('should get toppers', async () => {
    const date = new Date()

    date.setHours(0, 0, 0, 0)

    const response = await fetch(
      `http://localhost:3333/topper?dateInitial=${date.getTime()}`
    )

    expect(response.status).toBe(200)
  })
})
