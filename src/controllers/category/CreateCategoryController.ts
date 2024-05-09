import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'

export class CreateCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, priority } = req.body

    if (!name) throw new Error('Nome e obrigatório')
    if (priority < 0 || typeof priority !== 'number')
      throw new Error('Prioridade e obrigatório')

    if (typeof priority !== 'number')
      throw new Error('Prioridade deve ser um numero')

    const createCategoryService = new CreateCategoryService()

    const category = await createCategoryService.execute(name, priority)

    return res.json(category)
  }
}
