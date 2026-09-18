import { pool } from "../../DB/connection.js";

// CREATE sale
export const createSale = async (req, res) => {
  try {
    const { product_id, quantitiy_sold,sale_date } = req.body;
    const [results] = await pool.execute(
      `INSERT INTO sales (product_id, quantitiy_sold,sale_date) VALUES (?,?,?)`,
      [product_id, quantitiy_sold, sale_date],
    );
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Sale added successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create sale",
      error: error.code,
    });
  }
};

// GET all sales
export const getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * from sales`);
    if (rows.length !== 0) {
      return res.status(200).json({
        count: rows.length,
        data: [rows],
      });
    } else {
      return res.status(404).json({
        message: "No sales found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get sales",
      error: error.code,
    });
  }
};

// GET sales for specific product
export const getProductSales = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT * FROM sales WHERE product_id = ?`,
      [id],
    );
    if (rows.length !== 0) {
      return res.status(200).json({
        count: rows.length,
        data: rows,
      });
    } else {
      return res.status(404).json({
        message: "No sales found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get Sales of the product",
      error: error.code,
    });
  }
};

// GET total quantity sold for each product
export const getTotalQuantitySold = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        products.id AS product_id,
        products.name,
        SUM(sales.quantitiy_sold) AS total_quantity_sold
      FROM products
      LEFT JOIN sales ON sales.product_id = products.id
      GROUP BY products.id, products.name
    `);

    return res.status(200).json({
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get total quantity sold",
      error: error.code,
    });
  }
};

// 13.
export const salesInfo = async (req,res)=>{
  try {
    const [rows] = await pool.execute(
      `SELECT name, quantitiy_sold, sale_date FROM sales INNER JOIN products ON sales.id = products.id`
    )
    if(rows.length !== 0){
      return res.status(200).json({
        count:rows.length,
        data:rows
      })
    }else{
      return res.status(404).json({
        message:"No sold products"
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      message:"Failed to get products sales",
      error:error.code
    })
  }
}
