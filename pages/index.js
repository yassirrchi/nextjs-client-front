import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

 export default function HomePage({product}){
  console.log(product)
  return (
  <div><Header/><Featured product={product}/></div>)
 }

 export async function getServerSideProps(){
  const FeaturedProductId="645bd8c8a92099e081b6f5b3"
  await mongooseConnect()
  const product=await Product.findById(FeaturedProductId)
  return {props:{product:JSON.parse(JSON.stringify(product))}}

  

 }