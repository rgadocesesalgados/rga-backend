import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateAddressService } from '../../services/address/CreateAddressService'

export class CreateAddressController {
  async handle(req: RequestWithUser, res: Response) {
    const {
      rua,
      numero,
      bairro,
      ponto_de_referencia,
      cidade,
      frete_moto,
      frete_carro,
    } = req.body

    if (!rua) {
      throw new Error('Rua é obrigatória.')
    }

    if (typeof numero !== 'number' || numero < 0) {
      throw new Error('Numero é obrigatório.')
    }

    if (!bairro) {
      throw new Error('Bairro é obrigatório.')
    }

    if (!ponto_de_referencia) {
      throw new Error('Ponto de Referência é obrigatório.')
    }

    if (!cidade) {
      throw new Error('Cidade é obrigatório.')
    }

    const createAddressService = new CreateAddressService()

    const address = await createAddressService.execute({
      rua,
      numero,
      bairro,
      ponto_de_referencia,
      cidade,
      frete_moto,
      frete_carro,
    })
    return res.json(address)
  }
}
