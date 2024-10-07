import { Request, Response } from 'express'
import { DeleteSupplierService } from '../../services/supplier/delete'

export class RemoveSupplierController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const success = await new DeleteSupplierService().execute(id)

    if (!success) return res.status(410).end()
    return res.status(200).end()
  }
}
