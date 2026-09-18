
CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
IDENTIFIED BY 'root';

-- Initial permissions on every table in the application database.
GRANT SELECT, INSERT, UPDATE ON `retail_store`.*
TO 'store_manager'@'localhost';

-- Remove UPDATE access from every table.
REVOKE UPDATE ON `retail_store`.*
FROM 'store_manager'@'localhost';

-- Allow DELETE only on the Sales table.
GRANT DELETE ON `retail_store`.sales
TO 'store_manager'@'localhost';


