export const SELECT_ALL_ORDERS_BRIEF = `
    SELECT
    o.id,
    o.orderNumber,
    o.customerId,
    c.customerName,
    c.customerCode,
    o.orderDate,
    o.totalAmount,
    o.deliveryDate,
    o.timeSlot,
    o.deliveryStatus,
    o.paymentStatus,
    d.driverName,
    d.driverCode,
    o.deliveryAddress,
    CASE WHEN stats.unpaidOrdersCount > 0 THEN 1 ELSE 0 END as hasPaymentLeft,
    COALESCE(stats.unpaidOrdersCount, 0) as unpaidOrdersCount,
    COALESCE(stats.totalUnpaidAmount, 0) as unpaidTotalAmount
    FROM orders o
    LEFT JOIN customers c ON o.customerId = c.id
    LEFT JOIN drivers d ON o.driverId = d.id
    LEFT JOIN customerUnpaidStats stats ON o.customerId = stats.customerId
    WHERE o.isActive = 1 
      AND datetime(o.orderDate) BETWEEN datetime(:startDate) AND datetime(:endDate)
      AND (:filterUnpaid = 0 OR o.paymentStatus = 0 OR o.paymentStatus IS NULL)
` as const

export const SELECT_ORDER_BY_ID = `
    SELECT
    o.id,
    o.orderNumber,
    o.customerId,
    c.customerName,
    c.customerCode,
    c.addressStreet,
    c.addressCity,
    c.addressProvinceCode,
    c.addressZip,
    c.addressCountry,
    c.addressNeighborhood,
    c.phone,
    c.phoneAlt,
    c.mail,
    o.deliveryAddress,    
    o.orderDate,
    o.deliveryDate,
    o.totalAmount,
    o.subtotalAmount,
    o.taxAmount,
    o.timeSlot,
    o.driverId,
    d.driverName,
    d.driverCode,
    o.deliveryStatus,
    o.paymentStatus,
    o.notes,
    CASE WHEN stats.unpaidOrdersCount > 0 THEN 1 ELSE 0 END as hasPaymentLeft,
    COALESCE(stats.unpaidOrdersCount, 0) as unpaidOrdersCount,
    COALESCE(stats.totalUnpaidAmount, 0) as unpaidTotalAmount
    FROM orders o
    LEFT JOIN customers c ON o.customerId = c.id
    LEFT JOIN drivers d ON o.driverId = d.id
    LEFT JOIN customerUnpaidStats stats ON o.customerId = stats.customerId
    WHERE o.orderNumber = :orderNumber AND o.isActive = 1
` as const

export const SELECT_ORDER_ROWS_BY_ORDER_ID = `
    SELECT 
        r.id as rowId,
        r.orderId,
        r.productId,
        p.productCode,
        p.productName,
        p.category,
        r.quantity,
        r.unitPrice,
        r.totalPrice,
        r.totalGrossPrice,
        r.taxAmount,
        r.taxRate
    FROM orderRows r
    INNER JOIN orders o ON r.orderId = o.id
    INNER JOIN products p ON r.productId = p.id
    WHERE o.id = :orderId 
      AND o.isActive = 1
    ORDER BY r.id
` as const

export const SELECT_ALL_ORDERS_BY_CUSTOMER_ID = `
    SELECT
        id,
        orderNumber,
        customerId,
        orderDate,
        deliveryDate,
        timeSlot,
        driverId,
        subtotalAmount,
        taxAmount,
        totalAmount,
        deliveryStatus,
        paymentStatus,
        deliveryAddress,
        notes
    FROM orders
    WHERE customerId = :customerId 
        AND isActive = 1
        AND (:filterUnpaid = 0 OR paymentStatus = 0 OR paymentStatus IS NULL)
` as const

export const UPDATE_PAYMENT_STATUS_BY_ORDER_NUMBER = `
UPDATE orders
SET paymentStatus = :paymentStatus,
    updatedAt = CURRENT_TIMESTAMP
WHERE orderNumber = :orderNumber
` as const

export const UPDATE_DELIVERY_STATUS_BY_ORDER_NUMBER = `
UPDATE orders
SET deliveryStatus = :deliveryStatus,
    updatedAt = CURRENT_TIMESTAMP
WHERE orderNumber = :orderNumber
` as const

export const DELETE_ORDER_ROWS_BY_ORDER_ID = `
UPDATE orderRows
SET isActive = 0,
    updatedAt = CURRENT_TIMESTAMP,
    deletedAt = CURRENT_TIMESTAMP
WHERE orderId = :orderId
` as const

export const DELETE_ORDER = `
UPDATE orders
SET isActive = 0,
    updatedAt = CURRENT_TIMESTAMP
WHERE orderNumber = :orderNumber
` as const

export const SELECT_ORDER_ID_BY_NUMBER = `
SELECT id FROM orders WHERE orderNumber = :orderNumber
` as const

export const INSERT_ORDER = `
INSERT 
INTO orders (
    orderNumber, 
    customerId, 
    orderDate, 
    deliveryDate, 
    deliveryAddress, 
    timeSlot, 
    driverId,
    totalAmount, 
    subtotalAmount, 
    taxAmount, 
    deliveryStatus, 
    paymentStatus, 
    notes, 
    isActive)
VALUES (
    (SELECT IFNULL(MAX(orderNumber), 0) + 1 FROM orders),
    :customerId,
    COALESCE(:orderDate, CURRENT_TIMESTAMP),
    :deliveryDate,
    COALESCE(:deliveryAddress, (SELECT addressStreet || ', ' || addressCity || ', ' || addressProvinceCode || ', ' || addressZip || ', ' || addressCountry FROM customers WHERE id = :customerId)),
    :timeSlot,
    :driverId,
    :totalAmount,
    :subtotalAmount,
    :taxAmount,
    COALESCE(:deliveryStatus, 0),
    COALESCE(:paymentStatus, 0),
    :notes,
    1
);` as const

export const INSERT_ORDER_ROW = `
WITH product AS (
    SELECT netPrice, taxRate FROM products WHERE id = :productId
),
computed AS (
    SELECT
        :orderId AS orderId,
        :productId AS productId,
        :quantity AS quantity,
        COALESCE(:unitPrice, product.netPrice) AS unitPrice,
        COALESCE(:totalPrice, :quantity * COALESCE(:unitPrice, product.netPrice)) AS totalPrice,
        product.taxRate AS taxRate
    FROM product
)
INSERT 
INTO orderRows (
    orderId,
    productId,
    quantity,
    unitPrice,
    totalPrice,
    taxAmount,
    totalGrossPrice,
    taxRate,
    isActive)
SELECT
    :orderId,
    :productId, 
    :quantity,
    ROUND(unitPrice, 2),
    ROUND(totalPrice, 2),
    ROUND(totalPrice * taxRate / 100, 2),
    ROUND(totalPrice + (totalPrice * taxRate / 100), 2),
    taxRate,
    1
FROM computed
LIMIT 1
;` as const

export const SELECT_LAST_ESTIMATED_ORDER_NUMBER = `
    SELECT IFNULL(MAX(orderNumber), 0) as lastOrderNumber FROM orders
` as const


// export const UPDATE_ORDER_BY_NUMBER = `
// UPDATE orders
// SET customerId = :customerId,
//     deliveryDate = :deliveryDate,
//     timeSlot = :timeSlot,
//     driverId = :driverId,
//     totalAmount = :totalAmount,
//     subtotalAmount = :subtotalAmount,
//     taxAmount = :taxAmount,
//     deliveryStatus = :deliveryStatus,
//     paymentStatus = :paymentStatus,
//     notes = :notes,
//     updatedAt = CURRENT_TIMESTAMP
// WHERE orderNumber = :orderNumber
// ` as const

// export const SELECT_ORDER_COUNT = `
//     SELECT COUNT(*) as orderCount FROM orders WHERE isActive = 1
// ` as const

// export const UPDATE_ORDER_ROWS_BY_ORDER_ID = `
// UPDATE orderRows
// SET productId = :productId,
//     quantity = :quantity,
//     unitPrice = :unitPrice,
//     totalPrice = :totalPrice,
//     taxAmount = :taxAmount,
//     totalGrossPrice = :totalGrossPrice,
//     taxRate = :taxRate,
//     updatedAt = CURRENT_TIMESTAMP
// WHERE orderId = :orderId
// ` as const

