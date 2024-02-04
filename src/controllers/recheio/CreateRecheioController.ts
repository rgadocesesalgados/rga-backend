import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import {
  CreateRecheioService,
  RecheioProps,
} from '../../services/recheio/CreateRecheioService'

export class CreateRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, banner, price, is_pesado, to_bento_cake } =
      req.body as RecheioProps
    const createRecheioService = new CreateRecheioService()

    const recheio = await createRecheioService.execute({
      name,
      banner,
      price,
      is_pesado,
      to_bento_cake,
    })

    return res.json(recheio)
  }
}
