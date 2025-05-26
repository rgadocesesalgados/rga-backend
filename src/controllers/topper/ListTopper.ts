import { Request, Response } from 'express'
import { ListTopperServices } from '../../services/topper/ListTopper'

export class ListTopperController {
  async handle(req: Request, res: Response) {
    const listTopperService = new ListTopperServices()
    const fornecedor = req.params.fornecedor as
      | 'FORNECEDOR_PRINCIPAL'
      | 'FORNECEDOR_SECUNDARIO'
    if (
      !['FORNECEDOR_PRINCIPAL', 'FORNECEDOR_SECUNDARIO'].includes(fornecedor)
    ) {
      new Error('não encontrado')
    }

    const toppers = await listTopperService.execute(fornecedor)

    return res.json(toppers)
  }
}
