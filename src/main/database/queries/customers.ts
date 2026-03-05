export const SELECT_ALL_CUSTOMERS = `
    SELECT 
    id, 
    customerCode,
    customerName,
    addressStreet,
    addressCity,
    addressProvinceCode,
    addressZip,
    addressNeighborhood,
    addressCountry,
    phone,
    phoneAlt,
    mail,
    notes 
    FROM customers 
    WHERE isActive = 1
` as const

export const INSERT_CUSTOMER = `
INSERT INTO customers (customerCode, customerName, notes, addressStreet, addressCity, addressProvinceCode, addressZip, addressCountry, addressNeighborhood, phone, phoneAlt, mail, isActive)
VALUES (:customerCode, :customerName, :notes, :addressStreet, :addressCity, :addressProvinceCode, :addressZip, :addressCountry, :addressNeighborhood, :phone, :phoneAlt, :mail, 1)
` as const

export const UPDATE_CUSTOMER_BY_CODE = `
UPDATE customers 
SET customerName = :customerName,
    notes = :notes,
    addressStreet = :addressStreet,
    addressCity = :addressCity,
    addressProvinceCode = :addressProvinceCode,
    addressZip = :addressZip,
    addressCountry = :addressCountry,
    addressNeighborhood = :addressNeighborhood,
    phone = :phone,
    phoneAlt = :phoneAlt,
    mail = :mail,
    updatedAt = CURRENT_TIMESTAMP
WHERE customerCode = :customerCode
` as const

export const DELETE_CUSTOMER = `
UPDATE customers 
SET isActive = 0,
    deletedAt = CURRENT_TIMESTAMP,
    updatedAt = CURRENT_TIMESTAMP
WHERE customerCode = :customerCode
` as const

export const SELECT_CUSTOMER_BY_CODE = `
    SELECT
    c.id,
    c.customerCode,
    c.customerName,
    c.notes,
    c.addressStreet,
    c.addressCity,
    c.addressProvinceCode,
    c.addressZip,
    c.addressCountry,
    c.addressNeighborhood,
    c.phone,
    c.phoneAlt,
    c.mail,
    CASE WHEN stats.unpaidOrdersCount > 0 THEN 1 ELSE 0 END as hasPaymentLeft,
    COALESCE(stats.unpaidOrdersCount, 0) as unpaidOrdersCount,
    COALESCE(stats.totalUnpaidAmount, 0) as unpaidTotalAmount
    FROM customers c
    LEFT JOIN customerUnpaidStats stats ON c.id = stats.customerId
    WHERE c.customerCode = :customerCode AND c.isActive = 1
` as const

export const SELECT_CUSTOMER_UNPAID_ORDERS = `
    SELECT unpaidOrdersCount, totalUnpaidAmount
    FROM customerUnpaidStats
    WHERE customerId = :customerId
` as const

export const SELECT_CUSTOMER_PAYMENT_STATUS = `
    SELECT 
        customerId,
        customerCode,
        COUNT(CASE WHEN paymentStatus = 0 THEN 1 END) as unpaidOrdersCount,
        COUNT(*) as totalOrdersCount,
        COALESCE(SUM(CASE WHEN paymentStatus = 0 THEN totalAmount ELSE 0 END), 0) as totalUnpaidAmount,
        COALESCE(SUM(totalAmount), 0) as totalOrdersAmount,
        CASE 
            WHEN COUNT(CASE WHEN paymentStatus = 0 THEN 1 END) > 0 THEN 1
            ELSE 0
        END as hasPaymentLeft
    FROM orders 
    WHERE customerId = :customerId 
      AND isActive = 1
    GROUP BY customerId
` as const

export const CHECK_CUSTOMER_HAS_PAYMENT_LEFT = `
    SELECT CASE 
        WHEN EXISTS(
            SELECT 1 FROM orders 
            WHERE customerId = :customerId 
              AND paymentStatus = 0 
              AND isActive = 1
        ) THEN 1 
        ELSE 0 
    END as hasPaymentLeft
` as const

export const SELECT_CUSTOMER_CODE_COUNT = `
    SELECT COUNT(*) as count
    FROM customers
    WHERE LOWER(customerCode) = LOWER(:customerCode)
` as const

export const SELECT_CUSTOMERS_FOR_AUTOCOMPLETE = `
    SELECT 
    customerCode,
    customerName,
    id
    FROM customers
    WHERE isActive = 1
    ORDER BY customerName ASC
` as const