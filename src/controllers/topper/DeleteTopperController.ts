import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { DeleteTopperService } from '../../services/topper/DeleteTopperService'

export class DeleteTopperController {
  async handle(req: RequestWithUser, res: Response) {
    const topper_id = req.query.topper_id as string

    if (!topper_id) throw new Error('topper_id is required')

    const deleteTopperService = new DeleteTopperService()

    const topper = await deleteTopperService.execute(topper_id)

    return res.json(topper)
  }
}
