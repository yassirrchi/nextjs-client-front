import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/StyledProductGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title=styled.h1`
font.size:1.5em;
`
const ColWrapper=styled.div`
display:grid;
grid-template-columns:.8fr 1.2fr;
`
    


export default function ProductsPage({products}){
    return (
        <>
        <Header/>
        <Center>
         <Title>All products</Title>   
         {products.length}
         <ProductsGrid products={...products}/>
        </Center>
        

        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const products=await Product.find({},null,{sort:{'_id':-1}})
     
    return {
        props:{
            products:JSON.parse(JSON.stringify(products)) 
        }
    }
}