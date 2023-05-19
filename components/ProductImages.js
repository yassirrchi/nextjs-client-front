import { useState } from "react"
import { styled } from "styled-components"
const Image=styled.img`
    max-width:100%;
    max-height:100%;
    
    `
    const ImageButtons=styled.div`
    display:flex;
    grid-template-columns:1fr 1fr 1fr;
    gap:10px;
    margin-top:10px;
    `
    const ImageButton=styled.div`
    border:2px solid;
    ${props=>props.active?`border-color:purple;`:`border-color:transparent; opacity:.7;`}
    
    height:40px;
    padding:5px;
    cursor:pointer;
    `
    const BigImage=styled.img`
    max-width:100%;
    max-height:200px;
    
    `
    const MainImageWrapper=styled.div`
    text-align:center;
    `
export default function ProductImages({images}){
    const[activeImage,setActiveImage]=useState(images?.[0])
    
    return (
        <>
        <MainImageWrapper>
        <BigImage src={activeImage}/>
        </MainImageWrapper>
        <ImageButtons >
            {images.map(image=>(
                <ImageButton active={image===activeImage} key={image} onClick={()=>setActiveImage(image)}>
                <Image src={image}/>
                </ImageButton>
            ))}
        </ImageButtons>

        </>
    )

}