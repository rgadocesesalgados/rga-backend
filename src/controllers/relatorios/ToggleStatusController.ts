import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ToggleStatusService } from '../../services/relatorios/ToggleStatusService'
import { OrderCreate } from '../../types/order'

export class ToggleStatusController {
  async handle(req: RequestWithUser, res: Response) {
    const { ids, status } = req.body as {
      ids: string[]
      status: OrderCreate['status']
    }

    if (!ids?.length) throw new Error('Id é obrigatório')

    const toggleStatusService = new ToggleStatusService()

    const response = await toggleStatusService.execute(ids, status)

    return res.json(response)
  }
}
