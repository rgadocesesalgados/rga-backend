import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveCategoryService } from '../../services/category/RemoveCategoryService'

export class RemoveCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { name } = req.query as { name: string }
    const removeCategoryService = new RemoveCategoryService()

    const category = await removeCategoryService.execute(name)

    return res.json(category)
  }
}
