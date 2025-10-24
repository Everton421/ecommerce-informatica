'use client'
import { HeroSection } from "@/components/hero-section"
import { ProductCarousel } from "@/components/product-carousel"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { productType } from "./@types/product-type"

// Mock product data - will be replaced with real data later
const featuredProducts = [
  {
    id: 1,
    name: "Mouse Gamer RGB Pro",
    price: 189.9,
    originalPrice: 249.9,
    image: "/gaming-mouse-rgb.jpg",
    category: "Periféricos",
    rating: 4.8,
    reviews: 234,
  } 
]

const gamingProducts = [
  {
    id: 7,
    name: "Cadeira Gamer Pro",
    price: 899.9,
    originalPrice: 1199.9,
    image: "/ergonomic-gaming-chair.png",
    category: "Gamer",
    rating: 4.8,
    reviews: 345,
  },
  {
    id: 8,
    name: "Mousepad RGB XXL",
    price: 89.9,
    image: "/rgb-mousepad-xxl.jpg",
    category: "Gamer",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 9,
    name: "Controle Xbox Wireless",
    price: 449.9,
    image: "/xbox-controller.jpg",
    category: "Gamer",
    rating: 4.9,
    reviews: 678,
  },
  {
    id: 10,
    name: "Microfone Streaming USB",
    price: 349.9,
    originalPrice: 449.9,
    image: "/usb-streaming-microphone.jpg",
    category: "Gamer",
    rating: 4.8,
    reviews: 456,
  },
  {
    id: 11,
    name: "Suporte Monitor Duplo",
    price: 199.9,
    image: "/dual-monitor-stand.jpg",
    category: "Gamer",
    rating: 4.6,
    reviews: 123,
  },
  {
    id: 12,
    name: "Hub USB 3.0 RGB",
    price: 79.9,
    image: "/usb-hub-rgb.jpg",
    category: "Periféricos",
    rating: 4.5,
    reviews: 89,
  },
]

const hardwareProducts = [
  {
    id: 13,
    name: "Placa de Vídeo RTX 4060",
    price: 2499.9,
    originalPrice: 2999.9,
    image: "/nvidia-rtx-graphics-card.jpg",
    category: "Hardware",
    rating: 5.0,
    reviews: 234,
  },
  {
    id: 14,
    name: "Processador Ryzen 7",
    price: 1899.9,
    image: "/amd-ryzen-processor.jpg",
    category: "Hardware",
    rating: 4.9,
    reviews: 456,
  },
  {
    id: 15,
    name: "Memória RAM 16GB DDR5",
    price: 549.9,
    originalPrice: 699.9,
    image: "/ddr5-ram-memory.jpg",
    category: "Hardware",
    rating: 4.8,
    reviews: 567,
  },
  {
    id: 16,
    name: "Placa Mãe B550",
    price: 799.9,
    image: "/motherboard-b550.jpg",
    category: "Hardware",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 17,
    name: "Fonte 750W 80+ Gold",
    price: 599.9,
    originalPrice: 749.9,
    image: "/power-supply-750w.jpg",
    category: "Hardware",
    rating: 4.9,
    reviews: 345,
  },
  {
    id: 18,
    name: "Cooler CPU RGB",
    price: 249.9,
    image: "/cpu-cooler-rgb.jpg",
    category: "Hardware",
    rating: 4.6,
    reviews: 178,
  },
]

export default function HomePage() {
  
  const [ dataProducts, setDataProduct ] = useState<productType[]>();

  useEffect(()=>{
    async function getProducts(){
        try{
            const result = await api.get('/products');
            if(result.status == 200 ){  
              setDataProduct(result.data)
              console.log(result.data)
            }
        }catch(err){
          console.log("Erro ao obter dados da api ", err)
        }
      }
getProducts()
  },[])

  return (
    <div className="flex flex-col bg-black">
      <HeroSection />

      <section className="container mx-auto px-4 py-12">

        <ProductCarousel
          title="Produtos em Destaque"
          description="Os melhores produtos com preços especiais"
          products={dataProducts}
        />
      </section>

      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <ProductCarousel
            title="Setup Gamer Completo"
            description="Tudo que você precisa para o seu setup"
            products={dataProducts}
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ProductCarousel
          title="Hardware de Alta Performance"
          description="Componentes para montar ou fazer upgrade no seu PC"
          products={dataProducts}
        />
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-white text-lg font-semibold">Frete Grátis</h3>
              <p className="text-sm text-white  leading-relaxed">
                Para compras acima de R$ 299 em todo o Brasil
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white ">Compra Segura</h3>
              <p className="text-sm text-white leading-relaxed">Ambiente 100% seguro com certificado SSL</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-white font-semibold">Parcele em até 12x</h3>
              <p className="text-sm text-white leading-relaxed">Sem juros no cartão de crédito</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
