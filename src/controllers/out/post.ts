import { Request, Response } from 'express'
import z from 'zod'
import { CreateOut } from '../../services/out/createOut'

const schema = z.object({
  supplierId: z.string({ required_error: 'Supplier é obrigatório' }),
  value: z.coerce
    .number({ required_error: 'Valor é obrigatório' })
    .min(0.01, 'Valor deve ser maior que 0'),
  date: z.coerce
    .number({
      required_error: 'Data é obrigatório',
      invalid_type_error: 'Data deve ser um numero',
    })
    .positive('Data deve ser maior que 0'),
})

export type Out = z.infer<typeof schema>
export class PostOutController {
  async handle(req: Request, res: Response) {
    const outQuery = schema.safeParse(req.query)

    if (!outQuery.success) {
      return res.status(400).json({ error: outQuery.error.issues[0].message })
    }

    const out = await new CreateOut().execute(outQuery.data)

    res.status(201).json({ id: out.id })
  }
}
