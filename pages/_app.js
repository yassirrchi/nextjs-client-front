 
import { createGlobalStyle } from 'styled-components'
const GlobalStyles=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@200;400&family=Roboto&display=swap');
body{
  padding:0;
  margin:0;
  font-family: 'Roboto', sans-serif;
  background-color: #eee;
}
`


export default function App({ Component, pageProps }) {
  return (
  <>
  <GlobalStyles/>
  <Component {...pageProps} />
  
  </>)
}
