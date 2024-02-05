import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { AddRecheioService } from '../../services/bolo/AddRecheioService'

export class AddRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { bolo_id, recheio_id } = req.query as {
      bolo_id: string
      recheio_id: string
    }

    const addRecheioService = new AddRecheioService()

    const recheio = await addRecheioService.execute(bolo_id, recheio_id)

    return res.json(recheio)
  }
}
