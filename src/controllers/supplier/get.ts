import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { ListSupplierService } from '../../services/supplier/get'

export class ListSupplierController {
  async handle(req: RequestWithUser, res: Response) {
    const suppliers = await new ListSupplierService().execute()
    res.status(200).json(suppliers)
  }
}
