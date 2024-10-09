import { Request, Response } from 'express'
import { schema } from '../financial-report/get'
import { ListOut } from '../../services/out/listOut'

export class ListOutController {
  async handle(req: Request, res: Response) {
    const startDate = +req.query?.startDate || new Date().setHours(0, 0, 0, 0)
    const endDate = +req.query?.endDate || new Date().setHours(23, 59, 59, 999)

    const { startDate: parseStartDate, endDate: parseEndDate } = schema.parse({
      startDate: startDate,
      endDate: endDate,
    })

    const listOutService = await new ListOut().execute({
      endDate,
      startDate,
    })
    res.status(200).json(listOutService)
  }
}
