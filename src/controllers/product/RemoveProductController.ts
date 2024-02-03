import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RemoveProductService } from '../../services/product/RemoveProductService'

export class RemoveProductController {
  async handle(req: RequestWithUser, res: Response) {
    const { id } = req.body

    const removeProductService = new RemoveProductService()

    const product = await removeProductService.execute(id)

    return res.json(product)
  }
}
