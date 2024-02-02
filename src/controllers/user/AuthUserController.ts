import { Request, Response } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { tel, password } = req.body

    if (!tel) {
      throw new Error('Tel is required')
    }

    const authUserService = new AuthUserService()

    const user = await authUserService.execute({ tel, password })

    return res.json(user)
  }
}
