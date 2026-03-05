export const SELECT_ALL_SUPPLIERS = `
    SELECT 
    id, 
    supplierName,
    supplierCode,
    paymentForm,
    paymentTerms,
    notes 
    FROM suppliers 
    WHERE isActive = 1
` as const

export const INSERT_SUPPLIER = `
INSERT INTO suppliers (supplierCode, supplierName, paymentForm, paymentTerms, notes, isActive)
VALUES (:supplierCode, :supplierName, :paymentForm, :paymentTerms, :notes, 1)
` as const

export const UPDATE_SUPPLIER_BY_CODE = `
UPDATE suppliers
SET supplierName = :supplierName,
    paymentForm = :paymentForm,
    paymentTerms = :paymentTerms,
    notes = :notes,
    updatedAt = CURRENT_TIMESTAMP
WHERE supplierCode = :supplierCode
` as const

export const DELETE_SUPPLIER = `
UPDATE suppliers
SET isActive = 0,
    deletedAt = CURRENT_TIMESTAMP,
    updatedAt = CURRENT_TIMESTAMP
WHERE supplierCode = :supplierCode
` as const

export const SELECT_SUPPLIER_BY_CODE = `
    SELECT
    supplierCode,
    supplierName,
    paymentForm,
    paymentTerms,
    notes
    FROM suppliers
    WHERE supplierCode = :supplierCode AND isActive = 1
` as const

export const SELECT_SUPPLIER_CODE_COUNT = `
    SELECT COUNT(*) as count
    FROM suppliers
    WHERE LOWER(supplierCode) = LOWER(:supplierCode)
` as const