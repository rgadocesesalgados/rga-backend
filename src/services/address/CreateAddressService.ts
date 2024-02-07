import { prismaClient } from '../../prisma'

export interface AddressProps {
  rua: string
  numero: number
  bairro: string
  ponto_de_referencia: string
  cidade: string
}

export class CreateAddressService {
  async execute({
    rua,
    numero,
    bairro,
    ponto_de_referencia,
    cidade,
  }: AddressProps) {
    const address = await prismaClient.address.create({
      data: {
        rua,
        numero,
        bairro,
        ponto_de_referencia,
        cidade,
      },
    })
    return address
  }
}
