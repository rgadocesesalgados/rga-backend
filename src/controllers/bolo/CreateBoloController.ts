import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateBoloService } from '../../services/bolo/CreateBoloService'

export class CreateBoloController {
  async handle(req: RequestWithUser, res: Response) {
    const order_id = req.query.order_id as string

    const createBoloService = new CreateBoloService()

    const bolo = await createBoloService.execute(order_id)

    return res.json(bolo)
  }
}
