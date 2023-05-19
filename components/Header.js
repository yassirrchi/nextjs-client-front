import Link from "next/link";
import  styled  from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo=styled(Link)`
color:#fff;
text-decoration:none;
 
display:flex;
justify-content:center;
align-items:center;


position:relative;
z-index:3;
`
const Wrapper=styled.div`
display:flex;
justify-content:space-between;
padding:20px 5px;
`
const NavLink=styled(Link)`
color:#aaa;
display:block;
padding:10px 0;
text-decoration:none;
color:#aaa;
`
const StyledNav=styled.nav`
${props=>props.mobileNavActive?'display:block;':'display:none'}
display:none;
 
gap:15px;
position:fixed;
top:0;
padding:50px 20px 20px;
bottom:0;
left:0;
right:0;
background-color:#222;
@media screen and (min-width:768px){
    display:flex;
    position:static;
    padding:0;
}

`
const NavButton=styled.button`
background-color:transparent;
width:50px;
height:50px;
color:white;
border:0;
cursor:pointer;
position:relative;
z-index:3;
@media screen and (min-width:768px){
    display:none;
}

 

`

    


export default function Header(){
    const {cartProducts}=useContext(CartContext)
    const [mobileNavActive,setMobileNavActive]=useState(true)
    return (
        <StyledHeader>
            <Center>
                
                <Wrapper>
                 <Logo href={'/'}>EcomPFE</Logo>
            <StyledNav mobileNavActive={mobileNavActive}>
                
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
            </StyledNav> 
            <NavButton onClick={()=>setMobileNavActive(prev=>!prev)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
</svg>
</NavButton>  
                </Wrapper>

            </Center>
        </StyledHeader>
    )
}