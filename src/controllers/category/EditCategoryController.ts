import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditCategoryService } from '../../services/category/EditCategoryService'

export class EditCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { new_name } = req.body
    const { name } = req.query as { name: string }

    const editCategoryService = new EditCategoryService()

    const category = await editCategoryService.execute(name, new_name)

    return res.json(category)
  }
}
