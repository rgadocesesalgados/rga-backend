export interface OrderProps {
  id: string
  client_name: string
  client_tel: string
  client_id: string
  data: Date
  // bolos?: string
  products: ProductOrderProps[]
  cor_da_forminha: string
  observations: string
  delivery: boolean
  address: string
  address_id: string
  frete: 'FRETE_CARRO' | 'FRETE_MOTO'
  value_frete: number
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
  total: number
}

export interface ProductOrderProps {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  price: number
}

export interface CreateOrderProps
  extends Omit<
    OrderProps,
    'id' | 'client_name' | 'client_tel' | 'address' | 'value_frete' | 'products'
  > {
  products: CreateProductOrderProps[]
}

export interface CreateProductOrderProps
  extends Omit<
    ProductOrderProps,
    'id' | 'order_id' | 'product_name' | 'product_price'
  > {}
