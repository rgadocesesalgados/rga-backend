import { Response } from 'express'
import { ListAddressService } from '../../services/address/ListAddressService'
import { RequestWithUser } from '../../middlewares/isAuthenticated'

export class ListAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const listAddressService = new ListAddressService()
    const address = await listAddressService.execute()
    return res.json(address)
  }
}
