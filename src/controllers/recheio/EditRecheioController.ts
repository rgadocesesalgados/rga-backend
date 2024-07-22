import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RecheioProps } from '../../services/recheio/CreateRecheioService'
import { EditRecheioService } from '../../services/recheio/EditRecheioService'

export class EditRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, banner, price, is_pesado, to_bento_cake, price_fixed } =
      req.body as RecheioProps

    const id = req.query.id as string

    const editRecheioService = new EditRecheioService()

    const recheio = await editRecheioService.execute({
      id,
      name,
      banner,
      price,
      is_pesado,
      to_bento_cake,
      price_fixed,
    })

    return res.json(recheio)
  }
}
