import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import {
  ClientProps,
  CreateClientService,
} from '../../services/client/CreateClientService'

export class CreateClientController {
  async handle(req: RequestWithUser, res: Response) {
    const address_id = req.query.address_id as string

    const { name, tel } = req.body as ClientProps

    if (!name || !tel || !address_id) {
      throw new Error('Preencha todos os dados.')
    }

    const createClientService = new CreateClientService()

    const client = await createClientService.execute({
      name,
      tel,
      address_id,
    })

    return res.json(client)
  }
}
