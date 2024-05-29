import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ToggleStatusService } from '../../services/relatorios/ToggleStatusService'

export class ToggleStatusController {
  async handle(req: RequestWithUser, res: Response) {
    const { ids } = req.body as { ids: string[] }

    if (!ids?.length) throw new Error('Id é obrigatório')

    const toggleStatusService = new ToggleStatusService()

    const status = await toggleStatusService.execute(ids)

    return res.json(status)
  }
}
