import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnWrapper=styled.div`
display:grid;
grid-template-columns: 1.3fr .7fr;
gap:40px;

`
const Box=styled.div`
background-color:#fff;
border-radius:10px;
padding:30px
`

export default function CartPage(){
    const {cartProducts}=useContext(CartContext)
    const [products,setProducts]=useState([])
    useEffect(()=>{
        if(cartProducts.length>0){
            axios.post('/api/cart',{ids:cartProducts})
            .then(response=>{
                setProducts(response.data)
            })

        }
    },[cartProducts])
    return(<>
    <Header/>
    <Center>
    <ColumnWrapper>
    <Box>
        {!cartProducts?.length&&(
            <div>Your cart is empty</div>
        )}
        {cartProducts?.length>0&&(
            <>
            <h2>Cart</h2>
            {products.map(product=>(
                <div>{product.title} {cartProducts.filter(pid=>pid===product._id).length}</div>
            ))}
            </>
        )}

    </Box>
    {!!cartProducts?.length&&(
    <Box><h2>Order Information</h2><Button black block>Continue to checkout</Button></Box>

    )}
    </ColumnWrapper>
    </Center>
    </>);
}