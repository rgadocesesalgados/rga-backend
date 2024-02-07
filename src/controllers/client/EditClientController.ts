import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ClientProps } from '../../services/client/CreateClientService'
import { EditClientService } from '../../services/client/EditClientService'

export class EditClientController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, tel, address_id } = req.body as ClientProps

    const id = req.query.id as string

    if (!id) throw new Error('Id is required')

    const editClientService = new EditClientService()

    const client = await editClientService.execute({
      id,
      name,
      tel,
      address_id,
    })

    return res.json(client)
  }
}
