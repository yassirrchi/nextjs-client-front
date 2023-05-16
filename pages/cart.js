import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
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
padding:30px;
margin-top:30px;
`
const InfoCell=styled.td`
padding:10px 0;



`
const ProductImageBox=styled.div`
border:1px solid rgba(0,0,0,.1);
border-radius:10px;
max-width:150px;
max-height:150px;
padding:10px;
img{
    width:80px; 
    height:80px;
    
 }
 
 
border-redius:10px;
display:flex;
align-items:center;
justify-content:center;

`
export default function CartPage(){
    const {cartProducts,addProduct,removeProduct}=useContext(CartContext)
    const [products,setProducts]=useState([])
    useEffect(()=>{
        if(cartProducts.length>0){
            axios.post('/api/cart',{ids:cartProducts})
            .then(response=>{
                setProducts(response.data)
            })

        }
    },[cartProducts])
    function addMoreOfThis(productId){
        addProduct(productId)
        
    }
    function removeOneOfThis(productId){
        removeProduct(productId)
    }
     
    return(<>
    <Header/>
    <Center>
    <ColumnWrapper>
    <Box>
        <h2>Cart</h2>
        {!cartProducts?.length&&(
            <div>Your cart is empty</div>
        )}
        {cartProducts?.length>0&&(
        <Table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>

                </tr>
            </thead>

            <tbody>
            {products.map(product=>(
                <tr>
                <InfoCell><ProductImageBox><img src={product.images[0]}/></ProductImageBox>{product.title}</InfoCell>
                <td><Button  onClick={()=>removeOneOfThis(product._id)} >-</Button>{cartProducts.filter(pid=>pid===product._id).length}<Button onClick={()=>addMoreOfThis(product._id)}>+</Button></td>
                <td>${cartProducts.filter(pid=>pid===product._id).length*product.price}</td>
                </tr>
            ))}
                

                    

 



                     
                

            </tbody>
            
        </Table>)}


         

    </Box>
    {!!cartProducts?.length&&(
    <Box><h2>Order Information</h2><Button black block>Continue to checkout</Button></Box>

    )}
    </ColumnWrapper>
    </Center>
    </>);
}