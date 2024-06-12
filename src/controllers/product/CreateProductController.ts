import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateProductService } from '../../services/product/CreateProductService'

export class CreateProductController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, price, min_quantity, category_id, banner, size } = req.body

    const createProductService = new CreateProductService()

    const product = await createProductService.execute({
      name,
      price,
      min_quantity,
      banner,
      category_id,
      size,
    })

    return res.json(product)
  }
}
