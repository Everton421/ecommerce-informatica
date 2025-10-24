export type productType = {
    id:number,
    name:string,
    description:string, 
    price: string | number,
    offerPrice:string | number,
    category:string  ,
    createdAt:string | Date,
    updatedAt:  string | Date,
    imgs: imgProductType[] | []
}

type imgProductType = {
    id:number,
    productId:number,
    imgUrl: string;
}
 