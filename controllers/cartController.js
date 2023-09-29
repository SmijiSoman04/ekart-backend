//imports carts model
const carts = require('../models/cartSchema')

//add to cart collection
exports.addToCart = async(req,res0)=>{

    //get products details from the request
    const {id,title,price,image,quantity}=req.body
    
    //logic - 
    try{
        //check if the product is already in cart
        const products = await carts.findOne({id})
        if(products){
            //product is present in cart,update the quantity and price accordingly
            products.quantity+=1

            //update the grand total
            products.grandTotal=products.price*products.quantity

            //save changes to the db
            products.save()

            //sent response back to the client
            res0.status(200).json("Product details Updated")
        }
        else{
            //products is note present in the cart,Add product to cart
            const newProduct= new carts({
                id,title,price,image,quantity,grandTotal:price
            })
            //save new product details
            newProduct.save()

            //send response back to client
            res0.status(200).json("Product added successfully  ")
        }

    }
    catch(error){
         res0.status(404).json(error)
    }
}

//get cart product
exports.getCart=async(req,res)=>{
  try{
    const allCart=await carts.find()
    res.status(200).json(allCart)
  }  
  catch{(error)
      res.status(404).json(error)
  }
}

//delete a product from the cart

exports.deleteCartProduct=async(req,res)=>{
const {id}=req.params;
try{
  const removeProduct=await carts.deleteOne({id})  
  if(removeProduct.deleteCount!=0){
    //get all remaining products from cart
    const allProducts=await carts.find()
    res.status(200).json(allProducts)//response send back to client
  }
}    
catch(error){
    res.status(404).json(error)
}

}

//Increment the cart product count
exports.incrementProductCount = async(req,res)=>{
  //find product id
  const {id}=req.params

   //if the product is already in  the cart then quantity will be incremented by 1
    //then update the grand total
  try{
   const product =await carts.findOne({id})
   if(product){
    product.quantity+=1;
    product.grandTotal=product.price*product.quantity
    //save changes to the db
   await product.save()
    //after the product has been saved , update the content into the client side
    const allCart=await carts.find()
    res.status(200).json(allCart)
   }
   else{
    res.status(401).json("product not found")
   }
  }
  catch{
    
      res.status(404).json(error)
  }
  
}


//Decrement the cart product count
exports.decrementCartProduct = async(req,res)=>{
  //find product id
  const {id}=req.params

   //if the product is already in  the cart then quantity will be incremented by 1
    //then update the grand total
    try{
      const product =await carts.findOne({id})
   if(product){
    product.quantity-=1;
    if(product.quantity==0){
      await carts.deleteOne({id})
      //remaining products will be send to client
      const allCart=await carts.find()
      res.status(200).json(allCart)
    }
    //update the grand total
    product.grandTotal=product.price*product.quantity
    //save changes to the db
    await product.save()
    //after the product has been saved , update the content into the client side
    const allCart=await carts.find()
    res.status(200).json(allCart)

   }
   else{
    res.status(401).json("product Not found")
   }

    }
    catch{
    
      res.status(404).json(error)
  }
  
}