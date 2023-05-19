import { styled } from "styled-components"
import ProductBox from "./ProductBox"

const StyledProductGrid=styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap:30px;
padding-top:20px 
;
`

export default function ProductsGrid({products}){
    return(
        <StyledProductGrid>
            {products?.length>0&&products.map(product=>(<ProductBox {...product}/>))}

        </StyledProductGrid>
    )
}