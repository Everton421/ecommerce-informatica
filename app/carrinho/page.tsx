"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/orders-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const { addOrder } = useOrders()
  const { toast } = useToast()
  const router = useRouter()

  const shippingCost = totalPrice >= 299 ? 0 : 29.9

  const handleCheckout = () => {
    addOrder(items, totalPrice, shippingCost)
    clearCart()

    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você pode acompanhar seu pedido na página de pedidos",
    })

    router.push("/pedidos")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground leading-relaxed">
              Adicione produtos ao carrinho para continuar comprando
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
        <Button variant="ghost" onClick={clearCart}>
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar Carrinho
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/produto/${item.id}`} className="shrink-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/produto/${item.id}`}>
                        <h3 className="font-semibold hover:text-primary">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)} cada</div>
                        </div>
                        <Button variant="ghost" size="icon-sm" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} itens)</span>
                  <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-green-600">
                    {shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {(totalPrice + shippingCost).toFixed(2)}</span>
              </div>

              {totalPrice < 299 && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <p className="text-muted-foreground">
                    Faltam <span className="font-semibold text-foreground">R$ {(299 - totalPrice).toFixed(2)}</span>{" "}
                    para frete grátis
                  </p>
                </div>
              )}

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Parcele em até 12x sem juros</p>
                <p>• Entrega em todo o Brasil</p>
                <p>• Garantia de 12 meses</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Finalizar Compra
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar Comprando
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
