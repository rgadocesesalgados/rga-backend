import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveRecheioService } from '../../services/recheio/RemoveCategoryService'

export class RemoveRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { name } = req.query as { name: string }
    const removeRecheioService = new RemoveRecheioService()

    const recheio = await removeRecheioService.execute(name)

    return res.json(recheio)
  }
}
