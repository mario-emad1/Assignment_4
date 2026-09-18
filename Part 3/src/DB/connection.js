import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { productsTableQuery } from './Models/Products.model.js';
import { salesTableQuery } from './Models/Sales.model.js';
import { suppliersTableQuery } from './Models/Suppliers.model.js';
dotenv.config({ path: './src/Config/.env' });

export const pool = await mysql.createPool({
    // DB_INFO
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    // Pooling
    waitForConnections:true,
    connectionLimit:process.env.CONNECTION_LIMIT,
    queueLimit:process.env.QUEUE_LIMIT
})



export const getConnection = async () =>{
    try {
        await pool.execute('SELECT 1');
        console.log("DB connected successfully ✅");
    } catch (error) {
        console.log({message:"❌ Failed to connecto to the DB",Error:error});
    }
}


// Tables Creation
const createProductsTable = async (productQuery) =>{
    try {
        await pool.execute(productQuery);
        console.log("Products Table created successfully");
    } catch (error) {
        console.log("Failed to create Products Table");
    }
}
const createSuppliersTable = async (supplierQuery) =>{
    try {
        await pool.execute(supplierQuery);
        console.log("Supplier Table created successfully");
    } catch (error) {
        console.log("Failed to create supplier Table");
    }
}
const createSalesTable = async (salesQuery) =>{

    try {
        await pool.execute(salesQuery);
        console.log("Sales Table created successfully");
    } catch (error) {
        console.log("Failed to create Sales Table");
    }
}

// createSuppliersTable(suppliersTableQuery);
// createProductsTable(productsTableQuery);
// createSalesTable(salesTableQuery);