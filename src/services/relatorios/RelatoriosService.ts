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
      },
    })

    const bolos = await prismaClient.bolo.findMany({
      where: {
        order: {
          id: { in: orders.map(({ id }) => id) },
        },
      },
      select: {
        id: true,

        order: {
          select: {
            client: { select: { name: true } },
            status: true,
            date: true,
            hour: true,
          },
        },
        peso: true,
        formato: true,
        massa: true,
        recheio: { select: { name: true } },
        cobertura: true,
        description: true,
        banner: true,
        topper: true,
      },
      orderBy: { order: { date: 'asc' } },
    })

    const toppers = await prismaClient.topper.findMany({
      where: {
        bolo: {
          order: {
            id: { in: orders.map(({ id }) => id) },
          },
        },
      },
      select: {
        bolo: {
          select: {
            peso: true,
            order: {
              select: {
                client: { select: { name: true } },
                date: true,
                hour: true,
              },
            },
          },
        },
        name: true,
        idade: true,
        price: true,
        description: true,
        banner: true,
        tema: true,
      },
      orderBy: { bolo: { order: { date: 'asc' } } },
    })

    const boxes = await prismaClient.box.findMany({
      where: {
        order: {
          id: { in: orders.map(({ id }) => id) },
        },
      },
      select: {
        id: true,
        order: {
          select: {
            client: { select: { name: true } },
            date: true,
            hour: true,
            delivery: true,
            type_frete: true,
          },
        },

        ordeProduct: {
          select: {
            quantity: true,
            id: true,
            product: { select: { name: true } },
          },
        },
      },
      orderBy: { order: { date: 'asc' } },
    })

    const productsBox = await prismaClient.product.findMany({
      where: {
        order_product: {
          some: {
            Box: {
              orderId: { in: orders.map(({ id }) => id) },
            },
          },
        },
      },
      select: {
        order_product: {
          where: {
            Box: {
              orderId: { in: orders.map(({ id }) => id) },
            },
          },
          select: {
            product: { select: { name: true } },
            quantity: true,
          },
        },

        category: { select: { name: true, priority: true } },
      },
    })

    const productsOrder = await prismaClient.product.findMany({
      where: {
        order_product: {
          some: {
            order_id: { in: orders.map(({ id }) => id) },
          },
        },
      },
      select: {
        order_product: {
          select: {
            quantity: true,
            product: { select: { name: true } },
          },
          where: {
            order_id: { in: orders.map(({ id }) => id) },
          },
        },

        category: { select: { name: true, priority: true } },
      },
      orderBy: { category: { priority: 'asc' } },
    })

    const productList: {
      category_name: string
      count: number
      name: string
      priority: number
    }[] = []

    productsBox.forEach(({ category, order_product }) => {
      order_product.forEach(({ product: { name }, quantity }) => {
        productList.push({
          category_name: category.name,
          count: quantity,
          name,
          priority: category.priority,
        })
      })
    })

    productsOrder.forEach(({ category, order_product }) => {
      order_product.forEach(({ product: { name }, quantity }) => {
        productList.push({
          category_name: category.name,
          count: quantity,
          name,
          priority: category.priority,
        })
      })
    })

    productList.sort((a, b) => a.priority - b.priority)

    const newProductList = productList.reduce(
      (acc, { category_name, count, name }) => {
        const productIndex = acc.findIndex((product) => product.name === name)

        if (productIndex < 0) {
          return [...acc, { category_name, count, name }]
        }

        acc[productIndex].count += count

        return acc
      },
      [] as { category_name: string; count: number; name: string }[],
    )

    const products = newProductList.reduce(
      (acc, { category_name, count, name }) => {
        const current = acc[category_name]

        if (!current) {
          acc[category_name] = []
        }

        acc[category_name].push({ count, name })

        return acc
      },
      {} as {
        [key: string]: { count: number; name: string }[]
      },
    )

    console.log(newProductList)
    return {
      bolos: bolos.map((bolo) => ({
        client: bolo.order.client.name,
        status_order: bolo.order.status,
        date: bolo.order.date,
        hour: bolo.order.hour,
        peso: bolo.peso,
        formato: bolo.formato,
        massa: bolo.massa,
        recheio: bolo.recheio,
        cobertura: bolo.cobertura,
        description: bolo.description,
        banner: bolo.banner,
        topper: bolo.topper,
      })),
      toppers: toppers.map((topper) => ({
        client: topper.bolo.order.client,
        date: topper.bolo.order.date,
        hour: topper.bolo.order.hour,
        tema: topper.tema,
        name: topper.name,
        idade: topper.idade,
        price: topper.price,
        description: topper.description,
        banner: topper.banner,
        peso: topper.bolo.peso,
      })),
      boxes: boxes.map(
        ({
          id,
          order: {
            client: { name },
            date,
            hour,
            delivery,
            type_frete,
          },
          ordeProduct,
        }) => ({
          id,
          client: name,
          date,
          hour,
          delivery,
          type_frete,
          products: ordeProduct.map(({ id, product: { name }, quantity }) => ({
            id,
            name,
            quantity,
          })),
          size: ordeProduct.reduce((acc, { quantity }) => acc + quantity, 0),
        }),
      ),
      produtos: products,
      orders: orders.map(({ id }) => id),
    }
  }

  haveStatus(status: GetOrder['status'][]) {
    if (status.length > 0) {
      const OR = { OR: status.map((status) => ({ status })) }

      return OR
    }
  }
}
