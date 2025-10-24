"use client"

import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { productType } from "@/app/@types/product-type"
 

interface ProductCardProps {
  product: productType
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const discount = 0;
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price:Number( product.price),
      image: product.imgs && product.imgs[0].imgUrl,
      category: product.category,
    })
  }

  return (
    <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/produto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={  product.imgs[0] && product.imgs[0].imgUrl  ? product.imgs[0].imgUrl : "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && <Badge className="absolute right-2 top-2 bg-destructive text-white">-{discount}%</Badge>}
        </div>
      </Link>

      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <Link href={`/produto/${product.id}`}>
          <h3 className="line-clamp-2 font-semibold leading-tight transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.price}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.price})</span>
        </div>

        <div className="flex flex-col gap-1">
          {product.price && (
            <span className="text-xs text-muted-foreground line-through">R$ {Number(product.price).toFixed(2)}</span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-accent">R$ {Number(product.price).toFixed(2)}</span>
          </div>
          <span className="text-xs text-muted-foreground">ou 12x de R$ {(Number(product.price) / 12).toFixed(2)}</span>
        </div>

        <Button className="w-full gap-2 bg-accent hover:bg-black" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  )
}
