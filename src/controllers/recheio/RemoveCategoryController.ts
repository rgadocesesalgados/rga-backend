import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveRecheioService } from '../../services/recheio/RemoveCategoryService'

export class RemoveRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { id } = req.body
    const removeRecheioService = new RemoveRecheioService()

    const recheio = await removeRecheioService.execute(id)

    return res.json(recheio)
  }
}
