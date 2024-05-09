import { prismaClient } from '../../prisma'
import { CakeCreate } from '../../types/cake'
import { OrderCreate } from '../../types/order/create'
import { TopperCreate } from '../../types/topper'

export class CreateOrderService {
  async execute({
    client_id,
    date,
    hour,
    cakes = [],
    products = [],
    cor_forminhas = '',
    observations = '',
    delivery = false,
    address_id = null,
    type_frete = 'FRETE_MOTO',
    value_frete = 0,
    total = 0,
    status = 'RASCUNHO',
    payments = [],
  }: OrderCreate) {
    const [hours, minutes] = hour.split(':')

    const dateAndHour = new Date(date).setHours(Number(hours), Number(minutes))

    const order = await prismaClient.order.create({
      data: {
        client: { connect: { id: client_id } },
        date: new Date(dateAndHour),
        hour,
        cor_forminhas,
        observations,
        ...this.#isDelivey(delivery, address_id, type_frete, value_frete),
        total,
        status,
        orderProduct: {
          createMany: { data: products.length > 0 ? products : [] },
        },
        bolo: {
          create: this.#haveCake(cakes),
        },
      },
    })

    return order
  }

  #isDelivey(
    delivery = false,
    address_id: string,
    type_frete: 'FRETE_MOTO' | 'FRETE_CARRO',
    value_frete = 0
  ) {
    if (delivery) {
      return {
        delivery,
        address: { connect: { id: address_id } },
        type_frete,
        value_frete: value_frete,
      }
    } else {
      return {
        delivery,
        value_frete: 0,
      }
    }
  }

  #haveCake(cakes: CakeCreate[]) {
    return cakes.map((cake) => {
      return {
        recheio: { connect: cake.recheio },
        peso: cake.peso,
        formato: cake.formato,
        massa: cake.massa,
        price: cake.price,
        cobertura: cake.cobertura,
        description: cake.description,
        banner: cake.banner,
        ...this.#haveTopper(cake.topper),
      }
    })
  }

  #haveTopper(topper: TopperCreate | null) {
    if (topper?.tema) {
      return {
        topper: {
          create: {
            tema: topper.tema,
            name: topper.name,
            idade: topper.idade,
            price: topper.price,
            description: topper.description,
            banner: topper.banner,
          },
        },
      }
    }
  }
}
