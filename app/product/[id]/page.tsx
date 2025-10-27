"use client"
import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { ThreeDot } from "react-loading-indicators";
import { imgProductType, productType } from "@/app/@types/product-type";
 import   star_dull_icon  from '@/app/assets/star_dull_icon.svg'
 import   star_icon  from '@/app/assets/star_icon.svg'

const Product = () => {
    const { id } = useParams();

    const [productData, setProductData] = useState<productType>();
    const [catalogImage, setCatalogImage] = useState<imgProductType[]>();
    const [specificationImg, setSpecificationImg] = useState<imgProductType[]>();
    const [imgFiltered, setImgFiltered] = useState<imgProductType>();
    const [specificationsList, setSpecificationsList] = useState<Array<{ key: string; value: string }>>([]);

    async function filterData(id: number) {
        try {
            const result = await api.get(`products/${id}`)
            if (result.status === 200) {
                setProductData(result.data);
                const imgs = result.data.imgs as imgProductType[];
                if (imgs) {
                    setCatalogImage(imgs.filter((i) => i.typeImg === 'catalog'))
                    setImgFiltered(imgs.find((i) => i.typeImg === 'catalog'))
                    setSpecificationImg(imgs.filter((i: any) => i.typeImg === 'specification'))
                }

                // Formatar as especificações assim que os dados do produto forem recebidos
                if (result.data.specifications) {
                    formatSpecifications(result.data.specifications);
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        filterData(Number(id))
    }, [id])

    // Função para formatar as especificações
    const formatSpecifications = (specificationsText: string) => {
        const lines = specificationsText.split('\n');
        const formattedSpecs = lines.map(line => {
            const [key, value] = line.split(':');
            return {
                key: key?.trim(),
                value: value?.trim()
            };
        }).filter(spec => spec.key); // Remove linhas vazias

        setSpecificationsList(formattedSpecs);
    };


    return productData ? (<>
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden  bg-gray-500/10 mb-4  ">
                        <Image
                            src={imgFiltered ? imgFiltered.imgUrl : "/placeholder.svg"}
                            alt="alt"
                            className="   object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">

                        {catalogImage && catalogImage.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setImgFiltered(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image.imgUrl}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                               <Image className="h-4 w-4" src={star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={ star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={ star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={ star_icon} alt="star_icon" />
                             
                            <Image
                                className="h-4 w-4"
                                 src={ star_dull_icon }
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button
                            // onClick={() =>   addToCart(productData._id)   }
                            className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                          Adicionar ao carrinho
                        </button>
                        <button onClick={() => { /*addToCart(productData._id); router.push('/cart') */ }} className="w-full py-3.5 bg-accent text-white hover:bg-accent transition">
                            Comprar Agora
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-3xl font-medium">Especificações do <span className="font-medium text-accent">Produto</span></p>
                <div className="w-28 h-0.5 bg-accent mt-2"></div>
                <div className="flex flex-col items-center mb-4 mt-16">
                    {
                        specificationImg && specificationImg.map((i) =>
                            i.imgUrl ?
                                <Image
                                    src={i.imgUrl}
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                    alt="alt"

                                />
                                :
                                <Image
                                    src={"/placeholder.svg"}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />

                        )
                    }
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-14 w-full">
                    {specificationsList.map((spec, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <strong className="block text-gray-700 font-medium">{spec.key}:</strong>
                            <span className="text-gray-600">{spec.value}</span>
                        </div>
                    ))}
                </div>

                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
    </>
    ) : <div className=" flex items-center justify-center flex-1">
        <ThreeDot variant="brick-stack" color="#2563eb" size="large" text="" textColor="" />
    </div>
};

export default Product;