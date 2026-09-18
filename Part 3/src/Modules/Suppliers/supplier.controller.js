import { Router } from "express";
import * as supplierServices from './supplier.service.js';
const router = Router()

// http://localhost:3000/suppliers/




// ADD supplier
router.post('/addSupplier',supplierServices.addSupplier)

// GET supplier start with F
router.get('/getSupplierWithF',supplierServices.startWithF)

// GET all suppliers
router.get('/',supplierServices.getAll)

// UPDATE supplier
router.post('/updateSupplier/:id',supplierServices.updateSupplier)

// DELETE supplier
router.delete('/deleteSupplier/:id',supplierServices.deleteSupplier)

export default router