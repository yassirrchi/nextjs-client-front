import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe=require("stripe")(process.env.STRIPE_SK)

export default async function handler(req,res){
    if(req.method!=="POST"){
        res.json("should be a POST req");
        return
    }
    await mongooseConnect()
    const {name,email,streetAddress,city,country,postalCode,cartProducts}=req.body
    const productsIds=cartProducts;
    const uniqueIds=[...new Set(productsIds)]
    const productsInfos=await Product.find({_id:uniqueIds})

    let line_items=[]
    for(const productId of uniqueIds){
        const productInfo=productsInfos.find(p=>p._id.toString()===productId)
        const quantity=productsIds.filter(id=>id===productId)?.length||0
        if(quantity>0&&productInfo){

            line_items.push({
                quantity,
                price_data:{
                    currency:"USD",
                    product_data:{name:productInfo.title},
                    unit_amount:quantity*productInfo.price*100
                }
            })
        }
    }

    const orderDoc=await Order.create({
        line_items,name,email,city,postalCode,streetAddress,country,paid:false,

    })
    const session=await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        customer_email:email,
        success_url:process.env.PUBLIC_URL+"/thankyou",
        cancel_url:process.env.PUBLIC_URL+"/cart?canceled=1",
        metadata:{orderId:orderDoc._id.toString()}
    })

    res.json({
        url:session.url
    })

}