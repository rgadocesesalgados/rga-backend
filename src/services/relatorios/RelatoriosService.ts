import { prismaClient } from '../../prisma'
const inicio = new Date(new Date().setHours(0, 0, 0, 0))
const fim = new Date(new Date().setHours(23, 59, 59, 59))
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
            description: true,
            banner: true,
            topper: {
              select: {
                tema: true,
                name: true,
                idade: true,
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
        date: order.date,
        hour: order.hour,
        peso: bolo.peso,
        formato: bolo.formato,
        massa: bolo.massa,
        recheio: bolo.recheio,
        description: bolo.description,
      }))
      return acc.concat(bolos)
    }, [])

    const products = orders.reduce((acc, order) => {
      const products = order.orderProduct.map((product) => ({
        name: product.product.name,
        quantity: product.quantity,
        category_name: product.product.category_name,
      }))

      return acc.concat(products)
    }, [])

    return {
      bolos,
      products,
    }

    return orders.map((order) => ({
      client: order.client.name,
      tel: order.client.tel,
      date: order.date,
      hour: order.hour,
      delivery: order.delivery,
      adress: order.delivery
        ? {
            address_complete: order.address?.address_complete,
            type_frete: order.type_frete,
            value_frete: order.value_frete,
          }
        : null,
      bolo: order.bolo.map((bolo) => ({
        client: order.client.name,
        date: order.date,
        hour: order.hour,
        peso: bolo.peso,
        formato: bolo.formato,
        massa: bolo.massa,
        recheio: bolo.recheio,
        description: bolo.description,
      })),
      products: order.orderProduct.map((product) => ({
        name: product.product.name,
        quantity: product.quantity,
      })),
      cor_forminhas: order.cor_forminhas,
      observations: order.observations,
      total: order.total,
      status: order.status,
      payment: order.payment,
    }))
  }
}
