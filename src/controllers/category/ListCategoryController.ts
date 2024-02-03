import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListCategoryService } from '../../services/category/ListCategoryService'

export class ListCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const categorys = await new ListCategoryService().execute()

    return res.json(categorys)
  }
}
