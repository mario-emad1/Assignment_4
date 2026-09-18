import { Router } from "express";
import * as productServices from './products.service.js'
const router = Router()


// UPDATE bread
router.post('/updateBread',productServices.updateBread)

// DELETE bread
router.delete('/deleteEggs',productServices.deleteEggs)

// GET highest stock
router.get('/highestStockProduct',productServices.highestStock)

// GET products that have never been sold
router.get('/neverSoldProducts',productServices.notSold)

// ADD Category column and get the confirmation message
router.get('/addCat',productServices.addCat)

// DROP Category column and get the confirmation message
router.get('/rmCat',productServices.rmCat)

// CHANGE Category column datatype and get the confirmation message
router.get('/changeContactDT',productServices.changeContactDT)

// ADD NOT NULL constraint to name of product and get the confirmation message
router.get('/addNotNull',productServices.addNotNull)



// GET all products
router.get('/',productServices.getAll)

// CREATE product
router.post('/addProduct',productServices.addProdcut)

// GET Specific prodcut
router.get('/:id',productServices.getProduct)

// UPDATE product
router.post('/updateProduct/:id',productServices.updateProduct)

// DELETE product
router.delete('/deleteProduct/:id',productServices.deleteProduct)

export default router