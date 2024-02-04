import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import {
  ClientProps,
  CreateClientService,
} from '../../services/client/CreateClientService'

export class CreateClientController {
  async handle(req: RequestWithUser, res: Response) {
    const {
      name,
      tel,
      address: { rua, numero, bairro, ponto_de_referencia },
    } = req.body as ClientProps

    const createClientService = new CreateClientService()

    const client = await createClientService.execute({
      name,
      tel,
      address: { rua, numero, bairro, ponto_de_referencia },
    })

    return res.json(client)
  }
}
