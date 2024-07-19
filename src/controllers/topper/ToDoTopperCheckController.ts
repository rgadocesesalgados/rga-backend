import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ToDoTopperCheckService } from '../../services/topper/ToDoTopperCheckService'

export class ToDoTopperCheckController {
  async handle(req: RequestWithUser, res: Response) {
    const { ids } = req.body as { ids: string[] }

    const toDoTopperCheckService = new ToDoTopperCheckService()

    const result = await toDoTopperCheckService.execute({ ids })

    return res.json(result)
  }
}
