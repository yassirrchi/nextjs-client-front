import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
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
const CityHolder=styled.div`
display:flex;
gap:5px;`
export default function CartPage(){
    const {cartProducts,addProduct,removeProduct}=useContext(CartContext)
    const [products,setProducts]=useState([])
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[city,setCity]=useState("");
    const[postalCode,setPostalCode]=useState("");
    const[streetAddress,setStreetAddress]=useState("");
    const[country,setCountry]=useState("");

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
    let total=0;
    for(const productId of cartProducts){
        const price=products.find(p=>p._id===productId)?.price||0;
        total+=price;
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
                

                    

 



                     <tr><td></td><td></td><td>${total}</td></tr>
                

            </tbody>
            
        </Table>)}


         

    </Box>
    {!!cartProducts?.length&&(
    <Box>
        <h2>Order Information</h2>
        <form method="post" action="/api/checkout">
        <Input type="text" placeholder="Name" name="name" value={name} onChange={ev=>setName(ev.target.value)} />
        <Input type="text" placeholder="Email" name="email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
        <CityHolder>
        <Input type="text" placeholder="City" name="city" value={city} onChange={ev=>setCity(ev.target.value)}/>
        <Input type="text" placeholder="Postal Code" name="postalCode" value={postalCode} onChange={ev=>setPostalCode(ev.target.value)}/>
        </CityHolder>
        <Input type="text" name="streetAddress" placeholder="Street Address"/>
        <Input type="text" name="country" placeholder="Country" value={country} onChange={ev=>setCountry(ev.target.value)}/>
        <Input type="hidden" name="products"   value={cartProducts.join(',')}/>

        <Button black block type="submit">Continue to checkout</Button>
        </form>
    </Box>

    )}
    </ColumnWrapper>
    </Center>
    </>);
}