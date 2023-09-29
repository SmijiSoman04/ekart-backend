//To define routes for client request

//1.import express
const express = require('express');

//4. import product controller
const productController = require('../controllers/productController')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')
//2.using express create object for router class inorder to setup path
const router = new express.Router()

//3.Use router object to resolve client request

//get all products api request
router.get('/products/all-products',productController.getAllProducts)

//get a particular product details
router.get('/products/view-product/:id',productController.viewProduct)

//add a new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)

//view all wishlist item
router.get('/wishlists/view-all-wishlists',wishlistController.getWishlistItem)

//delete a particular wishlist  item
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct)

//add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//get cart products
router.get('/carts/get-cart',cartController.getCart)

//delete a particular cart item
router.delete('/carts/delete-product/:id',cartController.deleteCartProduct)

//increment cart quantity
router.get('/carts/increment-product/:id',cartController.incrementProductCount)

//decrement cart quantity
router.get('/carts/decrement-product/:id',cartController.decrementCartProduct)


//5.export routes
module.exports=router