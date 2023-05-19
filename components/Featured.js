import { styled } from "styled-components";
import Center from "./Center";
 
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "./CartContext";

  const Bg=styled.div`
  background-color: #222;
  color:#fff;
  padding:50px 20px;
  `
  const Title=styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width:768px){
    font-size:3rem;

  }
  `
  const Desc=styled.p`
  color:#aaa;
  font-size:.8rem;
  `
  const Wrapper=styled.div`

  display:grid;
  grid-template-columns: 1fr;
  
  
  gap:40px;
  img{
    max-width:100%;
    max-height:200px;
    display:block;
    margin:0 auto;
  }
  div:nth-child(1){
    order:2;
  }
   
  
  @media screen and (min-width:768px){
    grid-template-columns:1.1fr .9fr;
    div:nth-child(1){
        order:0;
      }
      img{
        max-width:100%;
      }
    
  }
  `
  const Column=styled.div`
  display:flex;
  align-items:center;
  `
  const ButtonsWrapper=styled.div`
  display:flex;
  gap:10px;
  `
export default function Featured({product}){
    const{addProduct}= useContext(CartContext)
    function addFeaturedToCart(){
        addProduct(product._id)


    }
    return(
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                    <div>
                        <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <ButtonsWrapper>
            <Button outline white size="l">Read More</Button>
            <Button onClick={addFeaturedToCart} primary size="l"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
 Add to cart</Button>
            </ButtonsWrapper>

                    </div>
                        
                    </Column>
                    <Column>
                        <img src={product.images[0]}/>

                    </Column>

                </Wrapper>
            </Center>

        </Bg>
    )

}