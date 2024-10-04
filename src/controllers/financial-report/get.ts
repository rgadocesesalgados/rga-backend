import { Request, Response } from 'express'
import { z } from 'zod'
import { ListFinancialReportService } from '../../services/financial-report/get'

const schema = z
  .object({
    todayStart: z.coerce
      .number()
      .nonnegative()
      .transform((value) => new Date(value).setHours(0, 0, 0, 0)),
    todayEnd: z.coerce
      .number()
      .nonnegative()
      .transform((value) => new Date(value).setHours(23, 59, 59, 999)),
  })
  .transform((fields) => {
    if (fields.todayStart > fields.todayEnd) {
      return {
        todayStart: fields.todayStart,
        todayEnd: new Date(fields.todayStart).setHours(23, 59, 59, 999),
      }
    }

    return fields
  })

export class ListFinancialReportController {
  async handle(req: Request, res: Response) {
    const todayStart = +req.query.todayStart || new Date().setHours(0, 0, 0, 0)
    const todayEnd = +req.query.todayEnd || new Date().setHours(23, 59, 59, 999)

    const { todayStart: parseTodayStart, todayEnd: parseTodayEnd } =
      schema.parse({
        todayStart,
        todayEnd,
      })

    const { value } = await new ListFinancialReportService().execute({
      endDate: parseTodayEnd,
      startDate: parseTodayStart,
    })

    return res.json({
      today_end: parseTodayEnd,
      today_start: parseTodayStart,
      value,
    })
  }
}
