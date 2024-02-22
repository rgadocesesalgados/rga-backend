import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { DeleteClientService } from '../../services/client/DeleteClientService'

export class DeleteClientController {
  async handle(req: RequestWithUser, res: Response) {
    const id = req.query.id as string

    if (!id) throw new Error('Id é obrigatório')
    const deleteClientService = new DeleteClientService()

    const client = await deleteClientService.execute(id)
    return res.json(client)
  }
}
