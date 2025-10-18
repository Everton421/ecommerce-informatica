"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  trackingCode?: string
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (items: CartItem[], subtotal: number, shipping: number) => void
  getOrder: (id: string) => Order | undefined
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Failed to load orders from localStorage:", error)
      }
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (items: CartItem[], subtotal: number, shipping: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "pending",
      trackingCode: `BR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    }

    setOrders((currentOrders) => [newOrder, ...currentOrders])
  }

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id)
  }

  return <OrdersContext.Provider value={{ orders, addOrder, getOrder }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
