import { OrderProduct } from '@prisma/client'

export interface ProductCreate
  extends Pick<
    OrderProduct,
    'product_id' | 'quantity' | 'price' | 'total' | 'order_id'
  > {}
