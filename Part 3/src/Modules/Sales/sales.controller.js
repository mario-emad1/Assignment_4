import { Router } from "express";
import * as salesServices from './sales.service.js'
const router = Router();

// http://localhost:3000/sales/

// CREATE sale
router.post('/createSale',salesServices.createSale)

// GET all sales with Product ● name ● Quantity sold  ● Sale date using SQL JOIN operations
router.get('/soldProducts',salesServices.salesInfo)

// GET total quantity sold for each product using SQL aggregation
router.get('/totalQuantitySold', salesServices.getTotalQuantitySold)

// GET all sales
router.get('/',salesServices.getAll)

// GET sales foor specific product
router.get('/:id',salesServices.getProductSales)


export default router;