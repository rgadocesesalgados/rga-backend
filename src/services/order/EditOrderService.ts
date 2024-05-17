import { prismaClient } from '../../prisma'
import { CakeCreate } from '../../types/cake'
import { EditOrder } from '../../types/order'
import { PaymentCreate } from '../../types/payment'
import { TopperCreate } from '../../types/topper'

export class EditOrderService {
  async execute({ bolo, orderProduct, address, payment, ...data }: EditOrder) {
    await prismaClient.topper.deleteMany({
      where: { bolo: { order_id: data.id } },
    })
    await prismaClient.bolo.deleteMany({
      where: { order_id: data.id },
    })
    await prismaClient.orderProduct.deleteMany({ where: { order_id: data.id } })
    await prismaClient.payment.deleteMany({ where: { order_id: data.id } })

    const order = await prismaClient.order.update({
      where: {
        id: data.id,
      },
      data: {
        bolo: {
          create: this.#haveCake(bolo),
        },
        orderProduct: {
          createMany: { data: orderProduct.length > 0 ? orderProduct : [] },
        },
        payment: { createMany: { data: this.#havePayment(payment) } },
        address_id: address.address_id,
        type_frete: address.type_frete,
        value_frete: address.value_frete,
        ...data,
      },
    })

    return order
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
        ...this.#haveTopper(cake.topper, cake.tem_topper),
      }
    })
  }

  #haveTopper(topper: TopperCreate | null, tem_topper: boolean) {
    if (tem_topper) {
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

  #havePayment(payments: PaymentCreate[]) {
    return payments.map((payment) => {
      return {
        value: payment.value,
        type: payment.type,
        ...this.#isPaid(payment),
      }
    })
  }

  #isPaid(payment: PaymentCreate) {
    if (payment.paid) {
      return {
        paid: payment.paid,
        date: payment.date,
      }
    }
  }
}
