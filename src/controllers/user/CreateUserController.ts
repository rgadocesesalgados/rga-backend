import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, tel, password, role } = req.body

    if (!tel) {
      return res.status(400).json({
        error: 'Tel is required',
      })
    }
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, tel, password, role })

    return res.json(user)
  }
}
