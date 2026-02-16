export type productType = {
    id:number,
    name:string,
    description:string, 
    price: string | number,
    offerPrice:string | number,
    category:string  ,
    specifications:string | null 
    createdAt:string | Date,
    updatedAt:  string | Date,
    imgs: imgProductType[] | []
}

export type imgProductType = {
    id:number 
    productId:number 
    imgUrl: string 
    typeImg: 'specification' | 'catalog'
}
 