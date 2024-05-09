import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditCategoryService } from '../../services/category/EditCategoryService'

export class EditCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, priority } = req.body
    const { id } = req.query as { id: string }

    const editCategoryService = new EditCategoryService()

    const category = await editCategoryService.execute(id, name, priority)

    return res.json(category)
  }
}
