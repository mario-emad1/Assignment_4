export const salesTableQuery = `
    CREATE TABLE IF NOT EXISTS sales(
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        quantitiy_sold INT NOT NULL,
        sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
    )
`