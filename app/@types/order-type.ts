import { CartItem } from "./cart-type"

export interface Order {
  tracking_id: string
  date: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}



export interface OrdersContextType {
  orders: Order[]
  addOrder: (items: CartItem[], subtotal: number, shipping: number  ) => void
  getOrder: (id: string) => Order | undefined
}
