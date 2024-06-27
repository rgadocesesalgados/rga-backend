import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveCategoryService } from '../../services/category/RemoveCategoryService'

export class RemoveCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { id } = req.query as { id: string }

    const removeCategoryService = new RemoveCategoryService()

    const category = await removeCategoryService.execute(id)

    return res.json(category)
  }
}
