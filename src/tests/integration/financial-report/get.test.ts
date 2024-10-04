import { describe, expect, it } from '@jest/globals'

describe('Get Financial Report', () => {
  it('GET endpoint `/financial-report` should return 200', async () => {
    const response = await fetch('http://localhost:3333/financial-report')

    expect(response.status).toBe(200)

    const todayStart = new Date().setHours(0, 0, 0, 0)
    const todayEnd = new Date().setHours(23, 59, 59, 999)

    const responseBody = await response.json()
    expect(responseBody).toMatchObject({
      today_start: todayStart,
      today_end: todayEnd,
      value: 0,
    })

    const today = new Date()

    const response2 = await fetch(
      `http://localhost:3333/financial-report?todayStart=${today.getTime()}`
    )
    console.log(today.getTime())

    expect(response2.status).toBe(200)

    const responseBody2 = await response2.json()
    expect(responseBody2).toMatchObject({
      today_start: today.setHours(0, 0, 0, 0),
      today_end: today.setHours(23, 59, 59, 999),
      value: 0,
    })

    const response3 = await fetch(
      `http://localhost:3333/financial-report?todayEnd=string`
    )

    expect(response3.status).toBe(200)

    expect(await response3.json()).toMatchObject({
      today_start: todayStart,
      today_end: todayEnd,
      value: 0,
    })
  })
})
