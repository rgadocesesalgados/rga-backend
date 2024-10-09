import { Request, Response } from 'express'
import { z } from 'zod'
import { ListFinancialReportService } from '../../services/financial-report/get'

export const schema = z
  .object({
    startDate: z.coerce
      .number()
      .nonnegative()
      .transform((value) => new Date(value).setHours(0, 0, 0, 0)),
    endDate: z.coerce
      .number()
      .nonnegative()
      .transform((value) => new Date(value).setHours(23, 59, 59, 999)),
  })
  .transform((fields) => {
    if (fields.startDate > fields.endDate) {
      return {
        startDate: fields.startDate,
        endDate: new Date(fields.startDate).setHours(23, 59, 59, 999),
      }
    }

    return fields
  })

export class ListFinancialReportController {
  async handle(req: Request, res: Response) {
    const startDate = +req.query?.startDate || new Date().setHours(0, 0, 0, 0)
    const endDate = +req.query?.endDate || new Date().setHours(23, 59, 59, 999)

    const { startDate: parseStartDate, endDate: parseEndDate } = schema.parse({
      startDate: startDate,
      endDate: endDate,
    })

    const { value } = await new ListFinancialReportService().execute({
      endDate: parseEndDate,
      startDate: parseStartDate,
    })

    return res.json({
      end_date: parseEndDate,
      start_date: parseStartDate,
      value,
    })
  }
}
