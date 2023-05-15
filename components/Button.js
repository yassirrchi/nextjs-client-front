import { styled } from "styled-components"
import css from "styled-jsx/css"

const StyledButton=styled.button`
border:0;
padding:5px 15px;
border-radius: 5px;
cursor:pointer;
display:inline-flex;
align-items:center;
svg{
    height:16px
}
${props=>props.black && css`
background-color:black;
color:#fff;
`}
${props=>props.block && css`
display: block;
width:100%;
`}

${props=>props.primary && !props.outline &&css`
background-color:#5542f6;
border:1px solid #5542f6;
color:#fff;
`}
${props=>props.primary && props.outline &&css`
background-color:transparent;
border:1px solid #5542f6;
color:#5542f6;
`}
${props=>props.size==='l' && css`
font-size: 1.2rem;
padding: 10px 20px; 
svg{
    height:20px;
    margin-right:5px;
}
`
}
${props=>props.white&& !props.outline &&css`
background-color:#fff;
color:#000
`}
${props=>props.white&& props.outline &&css`
background-color:transparent;
color:#fff;
border:1px solid #fff;
`}

`;

export default function Button({children,...rest}){
    return(
        <StyledButton {...rest}>
            {children}

        </StyledButton>
        
    )


}