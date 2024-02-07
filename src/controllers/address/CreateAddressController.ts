import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateAddressService } from '../../services/address/CreateAddressService'

export class CreateAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const { rua, numero, bairro, ponto_de_referencia, cidade } = req.body

    if (!rua || !numero || !bairro || !ponto_de_referencia || !cidade) {
      throw new Error('Preencha todos os dados.')
    }

    const createAddressService = new CreateAddressService()

    const address = await createAddressService.execute({
      rua,
      numero,
      bairro,
      ponto_de_referencia,
      cidade,
    })
    return res.json(address)
  }
}
