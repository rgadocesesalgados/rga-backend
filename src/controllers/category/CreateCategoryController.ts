import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'

export class CreateCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { name } = req.body
    const createCategoryService = new CreateCategoryService()

    const category = await createCategoryService.execute(name)

    return res.json(category)
  }
}
