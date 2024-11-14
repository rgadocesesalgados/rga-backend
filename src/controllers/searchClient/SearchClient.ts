import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { SearchClientService } from '../../services/searchClientService/SearchClientService'

export class SearchClientController {
  async handle(req: RequestWithUser, res: Response) {
    const { query = '' } = req.params

    const searchClientService = new SearchClientService()

    const clients = await searchClientService.execute(query)

    res.status(200).json(clients)
  }
}
