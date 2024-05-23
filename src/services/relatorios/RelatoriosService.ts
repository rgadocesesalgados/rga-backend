import { prismaClient } from '../../prisma'
const inicio = new Date(new Date().setHours(0, 0, 0, 0))
const fim = new Date(new Date().setHours(23, 59, 59, 59))

interface OrdersPrisma {
  orderProduct?: OrderProductPrisma[]
}

interface OrderProductPrisma {
  product: { name: string; category_name: string }
  quantity: string
}
export class RelatoriosService {
  async execute(
    dateInicial: Date = new Date(inicio),
    dateFinal: Date = new Date(fim)
  ) {
    const orders = await prismaClient.order.findMany({
      where: { date: { gte: dateInicial, lte: dateFinal } },
      select: {
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
            product: { select: { name: true, category_name: true } },
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

    bolos.sort((a, b) => {
      if (a.status_order !== 'EM_PRODUCAO') {
        return -1
      }
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    })

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
        })
      }
      return acc
    }, [])

    const orderProducts = orders.reduce((acc, order) => {
      const orderProducts = order.orderProduct.map((orderProduct) => ({
        name: orderProduct.product.name,
        category_name: orderProduct.product.category_name,
        quantity: orderProduct.quantity,
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
        })

        return acc
      }

      acc[productIndex].quantity += orderProduct.quantity

      return acc
    }, [])

    return {
      bolos,
      produtos: products,
      toppers,
    }
  }
}
