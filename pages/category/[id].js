import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/StyledProductGrid";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
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
const Filter=styled.div`
background-color:#ddd;
padding:5px 10px;
border-radius:5px;
display:flex;
gap:5px;
select{
    background:transparenn;
    border:0;
}`

export default function CategoryPage({category,subCategories,products:originalProducts}){
    const [products,setProducts]=useState(originalProducts)
    const [filtersValues,setFilterValues]=useState(category.properties.map(p=>({name:p.name,value:"all"})))
    function handleFilterChange(filterName,filterValue){
        setFilterValues(prev=>{
            return prev.map(p=>({
                name:p.name,
                value:p.name===filterName?filterValue:p.value
            }))

        })

    }
    useEffect(()=>{
        const catIds=[category._id, ...subCategories?.map(c=>c._id||[])]
        
        const params=new URLSearchParams;
        params.set("categories",catIds.join(","))

        filtersValues.forEach(f=>{
            if(f.value!=="all"){
              params.set(f.name,f.value)  
            }

            

        })
        const url="/api/products?"+params.toString()
        axios.get(url).then(res=>{
             setProducts(res.data)
        })



    },[filtersValues])
    return (
        <>
        <Header/>
        <Center>
            <CategoryHeader>
                <h1>{category.name}</h1>
                <FiltersWrapper>
                {category.properties.map(prop=>(
                    <Filter key={prop.name}>
                        {prop.name}
                        <select onChange={(ev)=>{handleFilterChange(prop.name,ev.target.value)}} value={filtersValues.find(f=>f.name===prop.name).value}>
                            <option value="all">All</option>
                            {prop.values.map(val=>(
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>


                    </Filter>
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
            products:JSON.parse(JSON.stringify(products)),
            subCategories:JSON.parse(JSON.stringify(subCategories))

        }
    }

}