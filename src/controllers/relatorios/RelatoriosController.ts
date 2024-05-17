import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RelatoriosService } from '../../services/relatorios/RelatoriosService'

export class RelatoriosController {
  async handle(req: RequestWithUser, res: Response) {
    const { initialDate, endDate } = req.body

    const relatoriosService = new RelatoriosService()

    const relatorios = await relatoriosService.execute(initialDate, endDate)

    return res.json(relatorios)
  }
}
