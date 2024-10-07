import { describe, expect, it } from '@jest/globals'

describe('Get Financial Report', () => {
  it('GET endpoint `/financial-report` should return 200', async () => {
    const auth = await fetch('http://localhost:3333/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        tel: process.env.ADMIN_TEL,
        password: process.env.ADMIN_PASSWORD,
      }),
    })

    const authBody = await auth.json()

    const headers = { Authorization: `Bearer ${authBody.token}` }

    const response = await fetch('http://localhost:3333/financial-report', {
      headers,
    })

    expect(response.status).toBe(200)

    const todayStart = new Date().setHours(0, 0, 0, 0)
    const todayEnd = new Date().setHours(23, 59, 59, 999)

    const responseBody = await response.json()

    expect(responseBody).toMatchObject({
      start_date: todayStart,
      end_date: todayEnd,
      value: 0,
    })

    const today = new Date()

    const response2 = await fetch(
      `http://localhost:3333/financial-report?todayStart=${today.getTime()}`,
      {
        headers,
      }
    )

    expect(response2.status).toBe(200)

    const responseBody2 = await response2.json()
    expect(responseBody2).toMatchObject({
      start_date: today.setHours(0, 0, 0, 0),
      end_date: today.setHours(23, 59, 59, 999),
      value: 0,
    })

    const response3 = await fetch(
      `http://localhost:3333/financial-report?todayEnd=string`,
      {
        headers,
      }
    )

    expect(response3.status).toBe(200)

    expect(await response3.json()).toMatchObject({
      start_date: todayStart,
      end_date: todayEnd,
      value: 0,
    })
  })
})
