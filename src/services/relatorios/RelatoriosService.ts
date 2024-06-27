import { prismaClient } from '../../prisma'
import { GetOrder } from '../../types/order'

interface GetRelatoriosExecute {
  dateInicial: Date
  dateFinal: Date
  status: GetOrder['status'][]
}
export class RelatoriosService {
  async execute({ dateInicial, dateFinal, status }: GetRelatoriosExecute) {
    const orders = await prismaClient.order.findMany({
      where: {
        date: { gte: dateInicial, lte: dateFinal },
        ...this.haveStatus(status),
      },
      select: {
        id: true,
        date: true,
        hour: true,
        client: {
          select: {
            name: true,
            tel: true,
            address: { select: { address_complete: true } },
          },
        },
        delivery: true,
        address: { select: { address_complete: true } },
        type_frete: true,
        value_frete: true,
        bolo: {
          select: {
            peso: true,
            formato: true,
            massa: true,
            recheio: { select: { name: true } },
            cobertura: true,
            description: true,
            banner: true,
            topper: {
              select: {
                tema: true,
                name: true,
                idade: true,
                price: true,
                description: true,
                banner: true,
              },
            },
          },
        },
        orderProduct: {
          select: {
            product: {
              select: {
                name: true,
                category_name: true,
                category: { select: { priority: true } },
                size: true,
              },
            },
            quantity: true,
          },
        },
        cor_forminhas: true,
        observations: true,
        total: true,
        status: true,
        payment: {
          select: { type: true, value: true, date: true, paid: true },
        },
      },
    })

    const bolos = orders.reduce((acc, order) => {
      const bolos = order.bolo.map((bolo) => ({
        order_id: order.id,
        client: order.client.name,
        status_order: order.status,
        date: order.date,
        hour: order.hour,
        peso: bolo.peso,
        formato: bolo.formato,
        massa: bolo.massa,
        recheio: bolo.recheio,
        cobertura: bolo.cobertura,
        description: bolo.description,
        banner: bolo.banner,
        topper: bolo.topper,
      }))
      return acc.concat(bolos)
    }, [])

    const toppers = bolos.reduce((acc, bolo) => {
      if (bolo.topper) {
        return acc.concat({
          client: bolo.client,
          date: bolo.date,
          hour: bolo.hour,
          tema: bolo.topper.tema,
          name: bolo.topper.name,
          idade: bolo.topper.idade,
          price: bolo.topper.price,
          description: bolo.topper.description,
          banner: bolo.topper.banner,
          peso: bolo.peso,
        })
      }
      return acc
    }, [])

    const orderProducts = orders.reduce((acc, order) => {
      const orderProducts = order.orderProduct.map((orderProduct) => ({
        name: orderProduct.product.name,
        category_name: orderProduct.product.category_name,
        quantity: orderProduct.quantity,
        category_priority: orderProduct.product.category.priority,
      }))
      return acc.concat(orderProducts)
    }, [])

    const products = orderProducts.reduce((acc, orderProduct) => {
      const productIndex = acc.findIndex(
        (product) => product.name === orderProduct.name
      )

      if (productIndex === -1) {
        acc.push({
          name: orderProduct.name,
          category_name: orderProduct.category_name,
          quantity: orderProduct.quantity,
          category_priority: orderProduct.category_priority,
        })

        return acc
      }

      acc[productIndex].quantity += orderProduct.quantity

      return acc
    }, [])

    products.sort((a, b) => a.category_priority - b.category_priority)

    bolos.sort((a, b) => a.date - b.date)

    const orderWithSweetPP = orders.map(
      ({ client, date, hour, delivery, type_frete, id, orderProduct }) => {
        const productsPP = orderProduct.reduce((acc, product) => {
          if (product.product.size === 'PP') {
            Array.from({ length: product.quantity }).map(() => {
              acc.push({ name: product.product.name, quantity: 1 })
            })
          }
          return acc
        }, [] as { name: string; quantity: number }[])

        return {
          client: client.name,
          date,
          hour,
          delivery,
          type_frete,
          id,
          productsPP,
        }
      }
    )

    const docesPP = orderWithSweetPP.reduce((acc, item) => {
      const boxesPP = [100, 50, 25]
      const products = item.productsPP
      let productsLength = products.length

      let count = 0
      boxesPP.forEach((size) => {
        if (productsLength === 0) return

        while (productsLength >= size) {
          const productsSize = products.slice(count, size + count)

          const productsSizeJoin = productsSize.reduce(
            (accProd, productSize) => {
              const index = accProd.findIndex(
                ({ name }) => name === productSize.name
              )

              if (index < 0) {
                accProd.push({
                  name: productSize.name,
                  quantity: productSize.quantity,
                })
              } else {
                accProd[index].quantity += productSize.quantity
              }

              return accProd
            },
            [] as { name: string; quantity: number }[]
          )

          acc.push({
            client: item.client,
            date: item.date,
            hour: item.hour,
            type_frete: item.delivery ? item.type_frete : undefined,
            products: productsSizeJoin,
          })

          productsLength -= size
          count += size
        }
      })

      return acc
    }, [] as { client: string; date: Date; hour: string; type_frete?: 'FRETE_CARRO' | 'FRETE_MOTO'; products: { name: string; quantity: number }[] }[])

    return {
      bolos: bolos.reduce((acc, item) => {
        if (item.status_order == 'EM_PRODUCAO') {
          acc.unshift(item)
          return acc
        }

        acc.push(item)
        return acc
      }, []),
      produtos: products,
      toppers,
      docesPP,
    }
  }

  haveStatus(status: GetOrder['status'][]) {
    if (status.length > 0) {
      const OR = { OR: status.map((status) => ({ status })) }

      return OR
    }
  }
}
