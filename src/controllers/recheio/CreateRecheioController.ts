import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import {
  CreateRecheioService,
  RecheioProps,
} from '../../services/recheio/CreateRecheioService'

export class CreateRecheioController {
  async handle(req: RequestWithUser, res: Response) {
    const { name, banner, price, is_pesado, to_bento_cake, price_fixed } =
      req.body as RecheioProps

    if (!name) throw new Error('Nome e obrigatório')

    if (!price) throw new Error('Preço e obrigatório')

    if (typeof price !== 'number') throw new Error('Preço deve ser um numero')

    const createRecheioService = new CreateRecheioService()

    const recheio = await createRecheioService.execute({
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
