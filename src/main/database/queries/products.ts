export const SELECT_ALL_PRODUCTS = `
    SELECT 
    p.id,
    p.productCode, 
    p.productName, 
    p.category, 
    p.netPrice, 
    p.taxRate, 
    p.supplierPrice, 
    s.supplierName 
    FROM products p 
    LEFT JOIN suppliers s ON p.supplierId = s.id
    WHERE p.isActive = 1
` as const

export const INSERT_PRODUCT = `
INSERT INTO products (productCode, productName, category, netPrice, taxRate, supplierPrice, supplierId, isActive)
VALUES (:productCode, :productName, :category, :netPrice, :taxRate, :supplierPrice, :supplierId, 1)
` as const

export const UPDATE_PRODUCT_BY_CODE = `
UPDATE products 
SET productName = :productName, 
    category = :category, 
    netPrice = :netPrice, 
    taxRate = :taxRate, 
    supplierPrice = :supplierPrice, 
    supplierId = :supplierId,
    updatedAt = CURRENT_TIMESTAMP
WHERE productCode = :productCode
` as const

export const DELETE_PRODUCT = `
UPDATE products 
SET isActive = 0,
    deletedAt = CURRENT_TIMESTAMP,
    updatedAt = CURRENT_TIMESTAMP
WHERE productCode = :productCode
` as const

export const SELECT_PRODUCT_BY_CODE = `
    SELECT
    p.id,
    p.productCode,
    p.productName,
    p.category,
    p.netPrice,
    p.taxRate,
    p.supplierPrice,
    s.supplierName
    FROM products p
    LEFT JOIN suppliers s ON p.supplierId = s.id
    WHERE p.productCode = :productCode AND p.isActive = 1
` as const

export const SELECT_PRODUCT_CODE_COUNT = `
    SELECT COUNT(*) as count
    FROM products
    WHERE LOWER(productCode) = LOWER(:productCode)
` as const

export const SELECT_PRODUCTS_FOR_AUTOCOMPLETE = `
    SELECT 
    p.productCode,
    p.productName,
    p.netPrice,
    p.taxRate,
    p.id,
    s.quantity as storageQuantity
    FROM products p
    LEFT JOIN storage s ON p.id = s.productId
    WHERE p.isActive = 1
    ORDER BY p.productName ASC
` as const

export const UPDATE_STORAGE_QUANTITY = `
INSERT INTO storage (productId, quantity, lastUpdated)
VALUES (:productId, :quantity, CURRENT_TIMESTAMP)
ON CONFLICT(productId) DO UPDATE SET
    quantity = quantity + :quantity,
    lastUpdated = CURRENT_TIMESTAMP
` as const

export const SET_STORAGE_QUANTITY = `
INSERT INTO storage (productId, quantity, lastUpdated)
VALUES (:productId, :quantity, CURRENT_TIMESTAMP)
ON CONFLICT(productId) DO UPDATE SET
    quantity = :quantity,
    lastUpdated = CURRENT_TIMESTAMP
` as const

export const INSERT_STORAGE_RECORD = `
INSERT INTO storage (productId, quantity)
VALUES (:productId, :quantity)
` as const

export const SELECT_STORAGE_QUANTITY_BY_PRODUCT_ID = `
    SELECT 
    quantity
    FROM storage
    WHERE productId = :productId
` as const

export const SELECT_STORAGE_RECORDS_BY_PRODUCT_ID = `
    SELECT 
    s.productId,
    s.quantity,
    s.lastUpdated,
    p.productCode,
    p.productName
    FROM storage s
    INNER JOIN products p ON s.productId = p.id
    WHERE s.productId = :productId
` as const