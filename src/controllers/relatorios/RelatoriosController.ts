import { Response } from 'express'
import { RequestWithUser } from '../../middlewares/isAuthenticated'
import { RelatoriosService } from '../../services/relatorios/RelatoriosService'

const iniciarDia = (date: Date) => {
  const zeroHoras = new Date(date).setHours(0, 0, 0, 0)

  return new Date(zeroHoras)
}

const fecharDia = (date: Date) => {
  const ultimaHora = new Date(date).setHours(23, 59, 59)

  return new Date(ultimaHora)
}

const hojeInicial = iniciarDia(new Date())
const hojeFinal = fecharDia(new Date())

export class RelatoriosController {
  async handle(req: RequestWithUser, res: Response) {
    const { dateInicial, dateFinal, status } = req.body

    const relatoriosService = new RelatoriosService()

    const relatorios = await relatoriosService.execute({
      dateInicial: dateInicial ? iniciarDia(dateInicial) : hojeInicial,
      dateFinal: dateFinal ? fecharDia(dateFinal) : hojeFinal,
      status,
    })

    return res.json(relatorios)
  }
}
