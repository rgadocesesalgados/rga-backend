import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveRecheioService } from '../../services/recheio/RemoveRecheioService'

export class RemoveRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { id } = req.query as { id: string }
    const removeRecheioService = new RemoveRecheioService()

    const recheio = await removeRecheioService.execute(id)

    return res.json(recheio)
  }
}
