import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { CreateTopperService } from '../../services/topper/CreateTopperServices'

export class CreateTopperController {
  async handle(req: RequestWithUser, res: Response) {
    const bolo_id = req.query.bolo_id as string

    const { tema, name, idade, price, description, banner } = req.body

    if (!bolo_id) throw new Error('Bolo id is required')
    if (!tema) throw new Error('Tema is required')
    if (!description) throw new Error('Description is required')

    const createTopperService = new CreateTopperService()

    const topper = await createTopperService.execute({
      bolo_id,
      tema,
      name,
      idade,
      price,
      description,
      banner,
    })

    return res.json(topper)
  }
}
