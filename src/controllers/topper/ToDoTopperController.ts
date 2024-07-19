import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ToDoTopperService } from '../../services/topper/ToDoTopperService'

export class ToDoTopperController {
  async handle(req: RequestWithUser, res: Response) {
    const { dateInitial = `${new Date().setHours(0, 0, 0, 0)}` } =
      req.query as {
        dateInitial: string
      }

    const toDoTopperService = new ToDoTopperService()

    console.log(new Date(+dateInitial))

    const topper = await toDoTopperService.execute({
      dateInitial: new Date(+dateInitial),
    })

    return res.json(topper)
  }
}
