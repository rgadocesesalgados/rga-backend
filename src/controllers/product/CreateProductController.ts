import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateProductService } from '../../services/product/CreateProductService'

export class CreateProductController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, price, min_quantity, banner, category, stock } = req.body

    const createProductService = new CreateProductService()

    const product = await createProductService.execute({
      name,
      price,
      min_quantity,
      stock,
      banner,
      category,
    })

    return res.json(product)
  }
}
