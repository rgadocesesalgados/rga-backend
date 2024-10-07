import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateSupplierService } from '../../services/supplier/post'

const schema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      message: 'Por favor, informe o nome',
      invalid_type_error: 'Nome deve ser uma string',
    })
    .min(3, 'Nome deve ter pelo menos 3 letras')
    .max(50, 'Nome deve ter no maximo 50 letras'),
  tel: z
    .string({
      required_error: 'Telefone é obrigatório',
      message: 'Por favor, informe o telefone',
      invalid_type_error: 'Telefone deve ser uma string',
    })
    .min(11, 'Telefone deve ter pelo menos 11 digitos'),
})

export type Supplier = z.infer<typeof schema>

export class CreateSupplierController {
  async handle(req: Request, res: Response) {
    const supplierQuery = schema.safeParse(req.query)

    if (!supplierQuery.success) {
      return res
        .status(400)
        .json({ error: supplierQuery.error.issues[0].message })
    }

    const supplier = await new CreateSupplierService().execute(
      supplierQuery.data
    )

    res.status(201).json({ id: supplier.id })
  }
}
