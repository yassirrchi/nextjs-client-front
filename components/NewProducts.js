import { styled } from "styled-components"
import Center from "./Center"
import ProductBox from "./ProductBox"

const ProductGrid=styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap:30px;
padding-top:20px 
;
`
const Title=styled.h2`
font-weight:400;
font-size:2rem;
margin:30px 0 20px;
`


export default function Newest({newProducts}){
    return(<div>
        <Center>
            <Title>New Arrivals</Title>
        <ProductGrid>
            {newProducts?.length>0&&newProducts.map(product=>(<ProductBox {...product}/>))}
        </ProductGrid>
        </Center>
        </div>)
}