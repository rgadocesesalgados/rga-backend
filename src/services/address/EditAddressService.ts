import { prismaClient } from '../../prisma'
import { AddressProps } from './CreateAddressService'

interface AddressPropsWithId extends AddressProps {
  id: string
}

export class EditAddressService {
  async execute({
    id,
    rua,
    numero,
    bairro,
    ponto_de_referencia,
    cidade,
    address_complete,
    frete_moto,
    frete_carro,
  }: AddressPropsWithId) {
    const address = await prismaClient.address.update({
      where: {
        id,
      },
      data: {
        rua,
        numero,
        bairro,
        ponto_de_referencia,
        cidade,
        address_complete: `${rua} - ${numero}, ${bairro}, ${ponto_de_referencia}, ${cidade}`,
        frete_moto,
        frete_carro,
      },
    })
    return address
  }
}
