import { pool } from "../../DB/connection.js";

// ADD supplier
export const addSupplier = async (req, res) => {
  try {
    const { name, contact_num } = req.body;
    const [results] = await pool.execute(
      `INSERT INTO suppliers (name,contact_num) VALUES (?,?)`,
      [name, contact_num],
    );
    if (results.affectedRows !== 0) {
      return res.status(200).json({
        message: "Supplier added successfully",
      });
    }
  } catch (error) {
    console.log("error");
    return res.status(500).json({
      message: "Failed to add supplier",
      error: error,
    });
  }
};

// GET all suppliers
export const getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
        `SELECT * FROM suppliers`
    )
    if(rows.length !== 0){
        return res.status(200).json({
            count:rows.length,
            data:rows
        })
    }else{
        return res.status(404).json({
            count:rows.length,
            message:"No supplier found"
        })
    }
    
  } catch(error) {
    return res.status(500).json({
        message:"Failed to get suppliers",
        Error:error.code
    })
  }
};

// UPDATE supplier
export const updateSupplier = async (req,res) =>{
    try{
        const {id} = req.params
        const {name,contact_num} = req.body
        const [results] = await pool.execute(
            `UPDATE suppliers SET name = ?, contact_num = ? WHERE id = ?`,
            [name,contact_num,id]
        )
        if(results.affectedRows !== 0){
            return res.status(200).json({
                message:"Supplier updated successfully"
            })
        }else{
            return res.status(200).json({
                message:"Supplier not found"
            })
        }
    } catch(error){
        return res.status(500).json({
            message:"Failed to updated the supplier",
            error:error.code
        })
    }
}

// DELETE supplier
export const deleteSupplier = async(req,res)=>{
    try {
        const {id} = req.params;
        const [results] = await pool.execute(
            `DELETE FROM suppliers WHERE id = ?`,
            [id]
        )
        if(results.affectedRows !== 0){
            return res.status(200).json({
                message:"Supplier deleted successfully"
            })
        }else{
            return res.status(404).json({
                message:"Supplier not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Failed to delete the supplier",
            error:error.code
        })
    }
}


// 11. 
export const startWithF = async(req,res)=>{
try {
    const [rows] = await pool.execute(
        `SELECT * FROM suppliers WHERE name LIKE 'F%'`
    )
    if(rows.length !== 0){
        return res.status(200).json({
            count:rows.length,
            data:rows
        })
    }else{
        return res.status(404).json({
            message:"No supplier found start with F"
        })
    }
} catch (error) {
    return res.status(500).json({
        messagge:"Failed to find supplier start with F",
        error: error.code
    })
}
}