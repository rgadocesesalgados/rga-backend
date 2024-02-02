import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, tel, password } = req.body

    if (!tel) {
      return res.status(400).json({
        error: 'Tel is required',
      })
    }
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, tel, password })

    return res.json(user)
  }
}
