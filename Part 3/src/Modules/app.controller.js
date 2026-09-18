import { getConnection } from "../DB/connection.js";

import { productsRouter, suppliersRouter, salesRouter } from "./index.js";

export const bootstrap = async (app, express) => {
  app.use(express.json());
  await getConnection();

    // https://localhost:3000/products
    app.use('/products',productsRouter);
    // https://localhost:3000/suppliers
    app.use('/suppliers',suppliersRouter);
    // https://localhost:3000/sales
    app.use('/sales',salesRouter);

    app.all('/*dummy',(req,res)=>{
        return res.status(404).json({
            message:"Handler not found"
        })
    })
};
