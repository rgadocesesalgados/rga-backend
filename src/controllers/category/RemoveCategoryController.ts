import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveCategoryService } from '../../services/category/RemoveCategoryService'

export class RemoveCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { name } = req.body
    const removeCategoryService = new RemoveCategoryService()

    const category = await removeCategoryService.execute(name)

    return res.json(category)
  }
}
