import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ProductProps } from '../../services/product/CreateProductService'
import { EditeProductService } from '../../services/product/EditeProductService'

export class EditeProductController {
  async handle(req: RequestWithUser, res: Response) {
    const { id, name, price, min_quantity, banner, category, stock } =
      req.body as ProductProps & { id: string }

    if (!id) throw new Error('Id is required')

    const editeProductService = new EditeProductService()

    const product = await editeProductService.execute({
      id,
      name,
      price,
      min_quantity,
      banner,
      category,
      stock,
    })

    return res.json(product)
  }
}
