"use client"

import Link from "next/link"
import { Package, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useOrders } from "@/contexts/orders-context"

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-500" },
  processing: { label: "Processando", color: "bg-blue-500" },
  shipped: { label: "Enviado", color: "bg-purple-500" },
  delivered: { label: "Entregue", color: "bg-green-500" },
  cancelled: { label: "Cancelado", color: "bg-red-500" },
}

export default function OrdersPage() {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Nenhum pedido encontrado</h1>
            <p className="text-muted-foreground leading-relaxed">Você ainda não realizou nenhum pedido</p>
          </div>
          <Button asChild size="lg">
            <Link href="/">Começar a Comprar</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const orderDate = new Date(order.date)
          const status = statusConfig[order.status]

          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Realizado em {orderDate.toLocaleDateString("pt-BR")} às {orderDate.toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                  <Badge className={`${status.color} w-fit text-white`}>{status.label}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity} • R$ {item.price.toFixed(2)} cada
                          </p>
                        </div>
                        <div className="text-right font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={order.shipping === 0 ? "text-green-600" : ""}>
                      {order.shipping === 0 ? "Grátis" : `R$ ${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Tracking Info */}
                {order.trackingCode && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Código de Rastreamento</p>
                        <p className="text-sm text-muted-foreground">{order.trackingCode}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href={`/pedidos/${order.id}`}>
                      Ver Detalhes
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Comprar Novamente
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
