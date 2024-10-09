import { Request, Response } from 'express'
import { DeleteOutService } from '../../services/out/deleteOut'

export class DeleteOut {
  async handle(req: Request, res: Response) {
    const { id: outId } = req.params

    const { id } = await new DeleteOutService().execute(outId)

    res.status(200).json({ id })
  }
}
