import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/StyledProductGrid";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
const CategoryHeader=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`
const FiltersWrapper=styled.div`
display:flex;
gap:10px;

`

export default function CategoryPage({category,products}){
    return (
        <>
        <Header/>
        <Center>
            <CategoryHeader>
                <h1>{category.name}</h1>
                <FiltersWrapper>
                {category.properties.map(prop=>(
                    <div>
                        {prop.name}
                        <select>
                            {prop.values.map(val=>(
                                <option value={val}>{val}</option>
                            ))}
                        </select>


                    </div>
                ))}</FiltersWrapper></CategoryHeader>
                <ProductsGrid products={products}/>
                
    
        </Center>


        </>
    )
}
export async function getServerSideProps(context){
    const category=await Category.findById(context.query.id)
    const subCategories=await Category.find({parent:category._id})
    const catIds=[category._id, ...subCategories.map(c=>c._id)]
    const products=await Product.find({category:catIds})
    return {
        props:{
            category:JSON.parse(JSON.stringify(category)),
            products:JSON.parse(JSON.stringify(products))

        }
    }

}