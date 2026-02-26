export interface CartItem {
  id: number
  name: string
  price: number
  offerPrice: number
  image: string
  category: string
  quantity: number 
  productId?:number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}