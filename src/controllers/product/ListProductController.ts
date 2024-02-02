import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListProductService } from '../../services/product/ListProductService'

export class ListProductController {
  async handle(req: RequestWithUser, res: Response) {
    const listProductService = new ListProductService()

    const products = await listProductService.execute()

    return res.json(products)
  }
}
