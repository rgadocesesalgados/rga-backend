import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveAddressService } from '../../services/address/RemoveAddressService'

export class RemoveAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const { id } = req.query as { id: string }

    const removeAddressService = new RemoveAddressService()

    const address = await removeAddressService.execute(id)

    return res.json(address)
  }
}
