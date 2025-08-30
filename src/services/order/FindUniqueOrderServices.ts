import { prismaClient } from '../../prisma'
import { GetAddress } from '../../types/address'
import { GetBox } from '../../types/box/get'
import { GetCake } from '../../types/cake'
import { GetOrder } from '../../types/order'
import { GetOrderProduct } from '../../types/order-product'
import { GetPayment } from '../../types/payment'
import { GetRecheio } from '../../types/recheio'
import { GetTopper } from '../../types/topper'

export class FindUniqueOrderServices {
  async execute(id: string): Promise<GetOrder> {
    const order = await prismaClient.order.findUnique({
      where: {
        id,
      },
      include: {
        client: {
          include: {
            address: true,
          },
        },
        boxes: {
          include: {
            ordeProduct: {
              include: {
                product: {
                  include: {
                    category: {
                      select: {
                        id: true,
                        name: true,
                        priority: true,
                        boxes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderProduct: {
          include: {
            product: {
              include: {
                category: {
                  select: { id: true, name: true, priority: true, boxes: true },
                },
              },
            },
          },
        },
        address: true,
        bolo: { include: { recheio: true, topper: true } },
        payment: true,
      },
    })

    const ordersGet = () => {
      const paymentsGet = () => {
        return order.payment.map((payment) => {
          return {
            order_id: order.id,
            id: payment.id,
            value: payment.value,
            type: payment.type,
            date: payment.date,
            paid: payment.paid,
          } as GetPayment
        })
      }
      const orderBoxGet = () => {
        return order.boxes.reduce((acc, box) => {
          acc.push({
            id: box.id,
            size: `${box.ordeProduct.reduce(
              (acc, { quantity }) => acc + quantity,
              0,
            )}`,
            category_id: box.ordeProduct[0].product.category.id,
            products: box.ordeProduct.map((orderP) => ({
              id: orderP.id,
              product_id: orderP.product_id,
              name: orderP.product.name,
              price: orderP.price,
              quantity: orderP.quantity,
              total: orderP.total,
            })),
          })

          return acc
        }, [] as GetBox[])
      }

      const orderProductGet = () => {
        return order.orderProduct.reduce((acc, orderProduct) => {
          acc.push({
            id: orderProduct.id,
            product_id: orderProduct.product_id,
            name: orderProduct.product.name,
            price: orderProduct.price,
            quantity: orderProduct.quantity,
            category: {
              id: orderProduct.product.category.id,
              name: orderProduct.product.category.name,
              priority: orderProduct.product.category.priority,
              boxes: orderProduct.product.category.boxes,
            },
            min_quantity: orderProduct.product.min_quantity,
            total: orderProduct.total,
            banner: orderProduct.product.banner,
            category_id: orderProduct.product.category.id,
          })

          return acc
        }, [] as GetOrderProduct[])
      }

      const boloGet = () => {
        return order.bolo.map((bolo) => {
          const recheioGet = () => {
            return bolo.recheio.map((recheio) => {
              return {
                id: recheio.id,
                name: recheio.name,
                price: recheio.price,
                is_pesado: recheio.is_pesado,
                to_bento_cake: recheio.to_bento_cake,
                banner: recheio.banner,
                price_fixed: recheio.price_fixed,
              } as GetRecheio
            })
          }

          const isTopper = () => {
            if (bolo?.topper?.id) {
              return {
                id: bolo.topper_id,
                tema: bolo.topper.tema,
                name: bolo.topper.name,
                idade: bolo.topper.idade,
                price: bolo.topper.price,
                description: bolo.topper.description,
                banner: bolo.topper.banner,
                recebido: bolo.topper.recebido,
                fornecedor: bolo.topper.fornecedor,
              } as GetTopper
            } else {
              return null
            }
          }
          return {
            id: bolo.id,
            peso: bolo.peso,
            formato: bolo.formato,
            massa: bolo.massa,
            recheio: recheioGet(),
            price: bolo.price,
            cobertura: bolo.cobertura,
            description: bolo.description,
            banner: bolo.banner,
            topper: isTopper(),
          } as GetCake
        })
      }

      const isDelivery = () => {
        if (order.delivery) {
          return {
            id: order.address_id,
            rua: order.address?.rua,
            numero: order.address?.numero,
            bairro: order.address?.bairro,
            ponto_de_referencia: order.address?.ponto_de_referencia,
            cidade: order.address?.cidade,
            address_complete: order.address?.address_complete,
            frete_moto: order.address?.frete_moto,
            frete_carro: order.address?.frete_carro,
            type_frete: order.type_frete,
            value_frete: order.value_frete,
          } as GetAddress
        } else {
          return null
        }
      }

      return {
        id: order.id,
        client: {
          id: order.client_id,
          name: order.client.name,
          tel: order.client.tel,
          address: {
            id: order.client.address_id,
            rua: order.client.address?.rua,
            numero: order.client.address?.numero,
            bairro: order.client.address?.bairro,
            cidade: order.client.address?.cidade,
            ponto_de_referencia: order.client.address?.ponto_de_referencia,
            address_complete: order.client.address?.address_complete,
            frete_moto: order.client.address?.frete_moto,
            frete_carro: order.client.address?.frete_carro,
          },
        },
        date: order.date,
        hour: order.hour,
        cor_forminhas: order.cor_forminhas,
        observations: order.observations,
        delivery: order.delivery,
        address: isDelivery(),
        total: order.total,
        status: order.status,
        payment: paymentsGet(),
        orderProduct: orderProductGet(),

        bolo: boloGet(),
        boxes: orderBoxGet(),
      } as GetOrder
    }

    return ordersGet()
  }
}
