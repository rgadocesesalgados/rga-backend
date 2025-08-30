import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ProductProps } from '../../services/product/CreateProductService'
import { EditeProductService } from '../../services/product/EditeProductService'

export class EditeProductController {
  async handle(req: RequestWithUser, res: Response) {
    const { id, name, price, min_quantity, banner } =
      req.body as ProductProps & { id: string }

    const { category_id } = req.query as { category_id: string }

    if (!id) throw new Error('Id é obrigatório')

    const editeProductService = new EditeProductService()

    const product = await editeProductService.execute({
      id,
      name,
      price,
      min_quantity,
      banner,
      category_id,
    })

    return res.json(product)
  }
}
