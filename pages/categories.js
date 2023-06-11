import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import { styled } from "styled-components";
const CategoryGrid=styled.div`
display:grid;

grid-template-columns:1fr 1fr;
gap:20px;
@media screen and (min-width:768px){
    grid-template-columns:1fr 1fr 1fr 1fr;
}
`
const CategoryTitle=styled.div`
margin-top:40px;
margin-bottom:0px;

display:flex;
align-items:center;
gap:20px;
a{
    color:#222;
}
`
const CategoryWrapper=styled.div`
margin-bottom:40px;
`
const ShowAllSqure=styled(Link)`
background-color:#ddd;
border-radius:15px;
height:190px;
display:flex;
align-items:center;
justify-content:center;
color:#555;
text-decoration:none;
`

export default function categories({mainCategories,categoriesProducts}){
    return <>
    <Header/>
    <Center>
       {mainCategories.map(cat=>(
       <CategoryWrapper>
        <CategoryTitle><h2>{cat.name}</h2><Link href={'/category/'+cat._id}>Show all </Link></CategoryTitle>
        
        <CategoryGrid>
       {categoriesProducts[cat._id].map(
        p=>(
             
         <ProductBox {...p}/>
        
        ))}
        <ShowAllSqure href={'/category/'+cat._id}>Show all
</ShowAllSqure>
        </CategoryGrid>
        </CategoryWrapper>))}
    </Center>

    
    </>
}
export async  function getServerSideProps(){
    const categories=await Category.find()
    const mainCategories=categories.filter(c=>!c.parent)
    const categoriesProducts={}
    for(const mainCat of mainCategories){
        const mainCatId=mainCat._id.toString()
        const childCategoryIds=categories.filter(c=>c?.parent?.toString()===mainCatId).map(c=>c._id)
        const categoriesIds=[mainCatId,...childCategoryIds]
        const products=await Product.find({category:categoriesIds},null,{limit:3,sort:{'_id':-1}})
        categoriesProducts[mainCat._id]=products
    }
    return{
        props:{
            mainCategories:JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts:JSON.parse(JSON.stringify(categoriesProducts))

        }
    }
}