import { prismaClient } from '../../prisma'

export class ListOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      include: {
        client: true,
        orderProduct: {
          select: {
            product_id: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
            quantity: true,
            price: true,
          },
        },
        address: true,
        bolo: true,
      },
    })

    const ordersWithProducts = orders.map((order) => {
      return {
        id: order.id,
        client_name: order.client.name,
        client_tel: order.client.tel,
        client_id: order.client_id,
        data: order.data,
        bolos: order.bolo,
        products: order.orderProduct.map(
          ({ product_id, price, quantity, product }) => {
            return {
              product_id,
              product_name: product.name,
              product_price: product.price,
              quantity,
              price,
            }
          }
        ),
        cor_da_forminha: order.cor_forminhas,
        observations: order.observations,
        delivery: order.delivery,
        address: order.address?.address_complete,
        address_id: order.address?.id,
        frete: order.type_frete,
        value_frete: order.value_frete,
        status: order.status,
        total: order.total,
      }
    })
    return ordersWithProducts
  }
}
