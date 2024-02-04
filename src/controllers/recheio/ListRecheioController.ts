import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListRecheioService } from '../../services/recheio/ListRecheioService'

export class ListRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const recheio = await new ListRecheioService().execute()

    return res.json(recheio)
  }
}
