import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Newest from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

 export default function HomePage({featuredProduct,newProducts}){
    console.log(newProducts)
  
  return (
  <div><Header/>
  <Featured product={featuredProduct}/>
  <div>fff</div>
  <Newest newProducts={newProducts}/>
  
  </div>)
 }

 export async function getServerSideProps(){
  const FeaturedProductId="645bd8c8a92099e081b6f5b3"
  await mongooseConnect()
  const featuredProduct=await Product.findById(FeaturedProductId)
  const newProducts=await Product.find({},null,{sort:{"_id":-1},limit:10})
  return {props:{featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),newProducts:JSON.parse(JSON.stringify(newProducts))}}

  

 }