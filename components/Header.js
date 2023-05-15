import Link from "next/link";
import  styled  from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo=styled(Link)`
color:#fff;
text-decoration:none;
`
const Wrapper=styled.div`
display:flex;
justify-content:space-between;
padding:20px 5px;
`
const NavLink=styled(Link)`
color:#aaa;
`
const StyledNav=styled.nav`
display: flex;
gap:15px`
    


export default function Header(){
    const {cartProducts}=useContext(CartContext)
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                 <Logo href={'/'}>EcomPFE</Logo>
            <StyledNav>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
            </StyledNav>   
                </Wrapper>

            </Center>
        </StyledHeader>
    )
}