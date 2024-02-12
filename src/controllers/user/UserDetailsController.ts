import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { UserDetailsService } from '../../services/user/UserDetailsService'

export class UserDetailsController {
  async handle(req: RequestWithUser, res: Response) {
    const user_id = req.user_id
    console.log(user_id)

    const userDetailsService = new UserDetailsService()

    const user = await userDetailsService.execute(user_id)

    return res.json(user)
  }
}
