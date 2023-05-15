import { styled } from "styled-components"
import Button from "./Button";
import Link from "next/link";

const Box=styled(Link)`
background-color: #fff;
padding:20px;
height:150px;
display:flex;
align-items:center;
justify-content:center;

img{
    max-width:100%;
    max-height:150px;
}

`;
const ProductWrapper=styled.div`

`
const Title=styled.h2`
font-weight:normal;
font-size:0.9rem;
margin:0;
`
const ProductInfoBox=styled.div`
margin-top:10px
`
const PriceRow=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-top:2px
`
const Price=styled.div`
font-size:1.5rem;
font-weight:bold;
`
export default function ProductBox({_id,title,description,images,price}){
    const url="/product/"+_id
    return (
        <ProductWrapper >
             
        <Box href={url}>
            <img  src={images[0]}/>
            
        </Box>
        <ProductInfoBox>
         <Title>{title}</Title>    
        </ProductInfoBox>
        <PriceRow>
            <Price>
                ${price}
            </Price>
            
<Button primary outline>Add to cart</Button>
        </PriceRow>
       
       
        </ProductWrapper>
    )
}