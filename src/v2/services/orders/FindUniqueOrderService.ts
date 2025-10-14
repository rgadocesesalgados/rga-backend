import { prismaClient } from '../../../prisma'

export class FindUniqueOrderService {
  async execute(id: string) {
    const order = await prismaClient.order.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        hour: true,
        cor_forminhas: true,
        observations: true,
        total: true,
        delivery: true,
        status: true,
        value_frete: true,
        address: { select: { address_complete: true, id: true } },
        type_frete: true,
        client: { select: { name: true, id: true, tel: true } },
        bolo: {
          select: {
            id: true,
            peso: true,
            formato: true,
            massa: true,
            price: true,
            cobertura: true,
            description: true,
            banner: true,
            recheio: {
              select: { id: true, price: true, price_fixed: true, name: true },
            },
            topper: {
              select: {
                id: true,
                tema: true,
                name: true,
                idade: true,
                price: true,
                description: true,
                banner: true,
                recebido: true,
                fornecedor: true,
              },
            },
          },
        },
        orderProduct: {
          select: {
            id: true,
            price: true,
            product_id: true,
            quantity: true,
            total: true,
            product: {
              select: { category: { select: { id: true } }, name: true },
            },
          },
          where: { order_id: id },
        },
        boxes: {
          select: {
            id: true,
            ordeProduct: {
              where: { boxId: { not: null } },
              select: {
                id: true,
                product_id: true,
                price: true,
                total: true,
                quantity: true,
                product: {
                  select: { category: { select: { id: true } }, name: true },
                },
              },
            },
          },
        },
        payment: {
          select: { date: true, id: true, paid: true, value: true, type: true },
        },
      },
    })

    const categories = await prismaClient.category.findMany({
      orderBy: { priority: 'asc' },
      select: { boxes: true, id: true },
    })

    if (!order) throw new Error('Pedido não encontrado')

    const {
      address,
      cor_forminhas,
      date,
      delivery,
      hour,
      id: orderId,
      observations,
      status,
      total,
      value_frete,
      type_frete,
      client,
      bolo,
      orderProduct,
      boxes,
      payment,
    } = order

    return {
      cakes: bolo.map(({ description, recheio, topper, ...rest }) => ({
        decoracao: description ?? '',
        tem_topper: !!topper,
        recheios: recheio,
        topper: topper ?? {
          fornecedor: 'FORNECEDOR_PRINCIPAL',
          banner: '',
          description: '',
          id: '',
          idade: '',
          name: '',
          price: 18,
          recebido: false,
          tema: '',
        },
        ...rest,
      })),
      client: { id: client.id, name: client.name, tel: client.tel },
      date,
      delivery,
      hour,
      observations,
      orderProduct: categories
        .filter((category) => category.boxes.length === 0)
        .reduce((acc, category, index) => {
          acc[index] = orderProduct.filter(
            (prod) => prod.product.category.id === category.id,
          )
          return acc
        }, []),
      boxes: categories
        .filter((category) => category.boxes.length > 0)
        .reduce(
          (acc, category, index) => {
            acc[index] = boxes
              .filter(
                (box) => box.ordeProduct[0].product.category.id === category.id,
              )
              .map((box) => {
                return {
                  id: box.id,
                  size: String(
                    box.ordeProduct.reduce(
                      (acc, { quantity }) => acc + quantity,
                      0,
                    ),
                  ),
                  products: box.ordeProduct.map(
                    ({
                      id,
                      product,
                      quantity,
                      product_id,
                      price,
                      total: productTotalPice,
                    }) => {
                      return {
                        id,
                        price,
                        product_id,
                        quantity,
                        total: productTotalPice,
                        name: product.name,
                      } as BoxProduct
                    },
                  ),
                }
              })

            return acc
          },
          [] as FormDataPedidos['boxes'],
        ),
      payment: payment.map((pay) => {
        return {
          id: pay.id,
          date: pay.date ? new Date(pay.date) : new Date(),
          paid: pay.paid,
          value: pay.value,
          formPayment: pay.type,
        }
      }),
      status,
      total,
      address: address?.address_complete,
      cor_forminhas,
      id: orderId,
      logistic: type_frete,
      value_frete,
      address_id: address?.id,
    } as FormDataPedidos
  }
}

interface FormDataPedidos {
  id?: string
  date: Date
  hour: string
  cor_forminhas?: string
  observations: string
  total: number
  delivery: boolean
  status: StatusProps
  client: Client
  boxes: Box[][]
  cakes: Cake[]
  orderProduct: OrderProductItem[][]
  logistic?: Logistic
  value_frete?: number
  address?: string
  payment: PaymentItem[]
}

type FormPayment =
  | 'DINHEIRO'
  | 'CARTAO_DE_CREDITO'
  | 'CARTAO_DE_DEBITO'
  | 'PIX'
  | 'DUPLICATA'

type TopperFornecedor = 'FORNECEDOR_PRINCIPAL' | 'FORNECEDOR_SECUNDARIO'

type CakeFormato = 'REDONDO' | 'QUADRADO'

type CakeMassa = 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'

type CakeCobertura =
  | 'CHANTILLY'
  | 'AVELA_BATIDO'
  | 'NATA'
  | 'CLARA_QUEIMADA'
  | 'KIT_KAT'

type StatusProps =
  | 'RASCUNHO'
  | 'ANOTADO'
  | 'EM_PRODUCAO'
  | 'ENTREGUE'
  | 'CANCELADO'
  | 'ORCAMENTO'

type Logistic = 'FRETE_CARRO' | 'FRETE_MOTO'

interface PaymentItem {
  formPayment: FormPayment
  value: number
  paid: boolean
  date?: Date
}

interface OrderProductItem {
  id?: string
  product_id: string
  quantity: number
  price: number
  total: number
}

interface Recheio {
  id: string
  price: number
  price_fixed: boolean
}

interface Topper {
  id?: string
  tema?: string
  name?: string
  idade?: number
  price?: number
  description?: string
  banner?: string
  recebido?: boolean
  fornecedor: TopperFornecedor
}

interface Cake {
  id?: string
  peso?: number
  recheios: Recheio[]
  formato: CakeFormato
  massa?: CakeMassa
  cobertura?: CakeCobertura
  decoracao?: string
  banner?: string
  topper?: Topper
  tem_topper?: boolean
  price?: number
}

interface BoxProduct {
  product_id: string
  quantity: number
  price: number
  total: number
}

interface Box {
  id: string
  size: string
  products: BoxProduct[]
}

interface Client {
  id: string
}
