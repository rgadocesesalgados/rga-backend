import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditAddressService } from '../../services/address/EditAddressService'

export class EditAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const addressId = req.query.id as string

    const { rua, numero, bairro, ponto_de_referencia, cidade } = req.body

    const editAddressService = new EditAddressService()

    const address = await editAddressService.execute({
      id: addressId,
      rua,
      numero,
      bairro,
      ponto_de_referencia,
      cidade,
    })
    return res.json(address)
  }
}
