import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { SearchAddressService } from '../../services/searchAddressService/SearchAddressService'

export class SearchAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const { query = '' } = req.params

    const searchAddressService = new SearchAddressService()

    const address = await searchAddressService.execute(query)

    res.status(200).json(address)
  }
}
