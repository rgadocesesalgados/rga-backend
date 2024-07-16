import { Request, Response } from 'express'
import { ListTopperServices } from '../../services/topper/ListTopper'

export class ListTopperController {
  async handle(req: Request, res: Response) {
    const listTopperService = new ListTopperServices()

    const toppers = await listTopperService.execute()

    return res.json(toppers)
  }
}
