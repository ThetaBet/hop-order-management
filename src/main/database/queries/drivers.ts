export const SELECT_ALL_DRIVERS = `
    SELECT 
    id, 
    driverCode,
    driverName,
    phone
    FROM drivers 
    WHERE isActive = 1
` as const

export const INSERT_DRIVER = `
INSERT INTO drivers (driverCode, driverName, phone, isActive)
VALUES (:driverCode, :driverName, :phone, 1)
` as const

export const UPDATE_DRIVER_BY_CODE = `
UPDATE drivers 
SET driverName = :driverName,
    phone = :phone,
    updatedAt = CURRENT_TIMESTAMP
WHERE driverCode = :driverCode
` as const

export const DELETE_DRIVER = `
UPDATE drivers 
SET isActive = 0,
    deletedAt = CURRENT_TIMESTAMP,
    updatedAt = CURRENT_TIMESTAMP
WHERE driverCode = :driverCode
` as const

export const SELECT_DRIVER_BY_CODE = `
    SELECT
    driverCode,
    driverName,
    phone
    FROM drivers
    WHERE driverCode = :driverCode AND isActive = 1
` as const

export const SELECT_DRIVER_CODE_COUNT = `
    SELECT 
    COUNT(*) as driverCodeCount 
    FROM drivers 
    WHERE driverCode = :driverCode
` as const