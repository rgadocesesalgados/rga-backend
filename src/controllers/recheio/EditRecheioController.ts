import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { EditCategoryService } from '../../services/category/EditCategoryService'
import { RecheioProps } from '../../services/recheio/CreateRecheioService'
import { EditRecheioService } from '../../services/recheio/EditRecheioService'

export class EditRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { id, name, banner, price, is_pesado, to_bento_cake } =
      req.body as RecheioProps & { id: string }

    const editRecheioService = new EditRecheioService()

    const recheio = await editRecheioService.execute({
      id,
      name,
      banner,
      price,
      is_pesado,
      to_bento_cake,
    })

    return res.json(recheio)
  }
}
