import { pool } from "../../DB/connection.js";

// $$$$ we have to import the connection file because we will run queries

// CREATE product
export const addProdcut = async (req, res) => {
  const { name, price, stock_quantitiy, supplier_id } = req.body;
  const [results] = await pool.execute(
    `INSERT INTO products (name, price, stock_quantitiy, supplier_id) VALUES (?,?,?,?)`,
    [name, price, stock_quantitiy, supplier_id],
  );

  try {
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Product added successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add the product",
      error: error.code,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM products`);
    if (rows.length !== 0) {
      return res.status(200).json({
        count: rows.length,
        data: rows,
      });
    } else {
      return res.status(404).json({
        message: "No products found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get products",
      error: error.code,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(`SELECT * FROM products WHERE id = ?`, [
      id,
    ]);
    if (rows.length !== 0) {
      return res.status(200).json({
        data: rows[0],
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get the product",
      error: error.code,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock_quantitiy, supplier_id } = req.body;
    const [results] = await pool.execute(
      `UPDATE products SET name = ?, price = ?, stock_quantitiy = ?, supplier_id = ? WHERE id = ?`,
      [name, price, stock_quantitiy, supplier_id, id],
    );
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Product updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to updated the product",
      error: error.code,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await pool.execute(`DELETE FROM products WHERE id = ?`, [
      id,
    ]);
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete the product",
      error: error.code,
    });
  }
};

// ====================================

// START of Q 5.

// Add the category
export const addCat = async (req, res) => {
  try {
    await pool.execute(
      `ALTER TABLE products ADD COLUMN category VARCHAR(255) NOT NULL`,
    );
    return res.status(200).json({
      message: "Category Column has been added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add the category column to products table",
      error: error.code,
    });
  }
};

// Remove the category
export const rmCat = async (req, res) => {
  try {
    await pool.execute(
      `ALTER TABLE products DROP COLUMN category`,
    );
    return res.status(200).json({
      message: "Category Column has been removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove the category column",
      error: error.code,
    });
  }
};

// Change the contact number to VARCHAR(15)
export const changeContactDT = async (req,res)=>{
  try {
    await pool.execute(
      `ALTER TABLE products MODIFY COLUMN category VARCHAR(15)`,
    );
    return res.status(200).json({
      message: "Category datatype has been changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:"Failed to change the datatype",
      error:error
    })
  }
}

// Add NOT NULL constraint to product name
export const addNotNull = async (req,res)=>{
  try {
    await pool.execute(
      `ALTER TABLE products MODIFY COLUMN name VARCHAR(15) NOT NULL`,
    );
    return res.status(200).json({
      message: "NOT NULL constraint has been added successfully to product name column",
    });
  } catch (error) {
    return res.status(500).json({
      message:"Failed to add NOT NULL",
      error:error
    })
  }
}

// END of Q 5

// 7. UPDATE Bread
export const updateBread = async (req, res) => {
  try {
    const [results] = await pool.execute(
      `UPDATE products SET price = 25.00 WHERE name = "Bread"`,
    );
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Product updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update the product",
      error: error,
    });
  }
};

// 8. DELETE Eggs
export const deleteEggs = async (req, res) => {
  try {
    const [results] = await pool.execute(
      `DELETE FROM products WHERE name = "Eggs"`,
    );
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete the product",
      error: error,
    });
  }
};

// 10.
export const highestStock = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT max(stock_quantitiy) AS HighestStockProduct FROM products`,
    );
    if (rows.length !== 0) {
      return res.status(200).json({
        data: rows[0],
      });
    } else {
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get the highest Stock product",
      error: error.code,
    });
  }
};

// 12.
export const notSold = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM products WHERE NOT EXISTS (
        SELECT * FROM sales WHERE products.id = sales.product_id
      )`,
    );
    if (rows.length !== 0) {
      return res.status(200).json({
        count: rows.length,
        data: [rows],
      });
    } else {
      return res.status(404).json({
        message: "All products have been sold",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get products that have never been sold",
      error: error.code,
    });
  }
};

