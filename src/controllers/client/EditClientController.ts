import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ClientProps } from '../../services/client/CreateClientService'
import { EditClientService } from '../../services/client/EditClientService'

export class EditClientController {
  async handle(req: RequestWithUser, res: Response) {
    const {
      id,
      name,
      tel,
      address: { rua, numero, bairro, ponto_de_referencia },
    } = req.body as ClientProps & { id: string }

    if (!id) throw new Error('Id is required')

    const editClientService = new EditClientService()

    const client = await editClientService.execute({
      id,
      name,
      tel,
      address: { rua, numero, bairro, ponto_de_referencia },
    })

    return res.json(client)
  }
}
