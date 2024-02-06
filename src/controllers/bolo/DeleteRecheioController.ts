import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { DeleteeRecheioService } from '../../services/bolo/DeleteRecheioService'

export class DeleteRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { bolo_id, recheio_id } = req.query as {
      bolo_id: string
      recheio_id: string
    }

    const deleteRecheioService = new DeleteeRecheioService()

    const bolo = await deleteRecheioService.execute(bolo_id, recheio_id)

    return res.json(bolo)
  }
}
