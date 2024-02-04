import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListClientService } from '../../services/client/ListClientService'

export class ListClientController {
  async handle(req: RequestWithUser, res: Response) {
    const listClientService = new ListClientService()

    const clients = await listClientService.execute()

    return res.json(clients)
  }
}
