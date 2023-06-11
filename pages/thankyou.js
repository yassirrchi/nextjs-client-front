import Center from "@/components/Center";
import Header from "@/components/Header";

export default function Thankyou(){
    return <>
    <Header/>
    <Center>
        <div className="d-flex justify-center align-">
        
            
             
                <h1 className="text-center">Commande confirmée </h1>
                <div >
                  <svg xmlns="http://www.w3.org/2000/svg" height="6em" className="" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>   
                </div>
               
                <br/>
                <Center>
                Merci pour votre achat ! Nous vous remercions de votre confiance. Votre commande a été confirmée avec succès. Un e-mail de confirmation contenant tous les détails de votre achat vous a été envoyé.
                </Center>
                
             
            
        </div>
            
            
             
             
            


            
         
        
    </Center>


     
    
    </>
}