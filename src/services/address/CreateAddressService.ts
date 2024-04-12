import { prismaClient } from '../../prisma'

export interface AddressProps {
  rua: string
  numero: number
  bairro: string
  ponto_de_referencia: string
  cidade: string
  frete_moto: number
  frete_carro: number
}

export class CreateAddressService {
  async execute({
    rua,
    numero,
    bairro,
    ponto_de_referencia,
    cidade,
    frete_carro,
    frete_moto,
  }: AddressProps) {
    const address = await prismaClient.address.create({
      data: {
        rua,
        numero,
        bairro,
        ponto_de_referencia,
        cidade,
        frete_moto,
        frete_carro,
        address_complete: `${rua} - ${numero}, ${bairro}, ${ponto_de_referencia}, ${cidade}`,
      },
    })
    return address
  }
}
