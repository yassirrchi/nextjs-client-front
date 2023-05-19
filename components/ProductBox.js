import { styled } from "styled-components"
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

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
display:block;
@media screen and (min-width:768px){
display:flex;

}
align-items:center;
justify-content:space-between;
margin-top:2px
`
const Price=styled.div`
font-size:1rem;
font-weight:bold;
text-align:right;
@media screen and (min-width:768px){
    font-size:1.5rem;
    text-align:left;
    
    
    }
`
export default function ProductBox({_id,title,description,images,price}){
    const{addProduct}= useContext(CartContext)
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
            
<Button primary outline onClick={()=>addProduct(_id)}>Add to cart</Button>
        </PriceRow>
       
       
        </ProductWrapper>
    )
}