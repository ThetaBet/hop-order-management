const TABLE_CUSTOMERS_INIT = `
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerCode VARCHAR(20) NOT NULL UNIQUE,
  customerName TEXT NOT NULL,
  notes TEXT, 
  addressStreet TEXT, 
  addressCity VARCHAR(100),
  addressProvinceCode VARCHAR(2),
  addressZip VARCHAR(7),
  addressCountry VARCHAR(100),
  addressNeighborhood VARCHAR(100),
  phone VARCHAR(20),
  phoneAlt VARCHAR(20),
  mail VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE
);` as const

const TABLE_PRODUCTS_INIT = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productCode VARCHAR(20) NOT NULL UNIQUE,
  productName TEXT NOT NULL,
  category VARCHAR(100),
  netPrice DECIMAL(10, 2) NOT NULL,
  taxRate DECIMAL(5, 2) NOT NULL,
  supplierId INTEGER DEFAULT NULL,
  supplierPrice DECIMAL(10, 2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (supplierId) REFERENCES suppliers (id) ON DELETE SET NULL
);` as const

const GENERATE_INDEXES = `
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders (customerId);
CREATE INDEX IF NOT EXISTS idx_orders_driver ON orders (driverId);
CREATE INDEX IF NOT EXISTS idx_orders_payment_active ON orders (paymentStatus, isActive);
CREATE INDEX IF NOT EXISTS idx_orders_active_date ON orders (isActive, orderDate);

` as const

const TABLE_SUPPLIERS_INIT = `
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplierCode VARCHAR(20) NOT NULL UNIQUE,
    supplierName TEXT NOT NULL,
    paymentForm VARCHAR(100),
    paymentTerms VARCHAR(100),
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);` as const

const TABLE_ORDERS_INIT = `
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orderNumber INTEGER NOT NULL UNIQUE,
  customerId INTEGER NOT NULL,
  orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deliveryDate TIMESTAMP,
  deliveryAddress TEXT,
  timeSlot VARCHAR(50) CHECK (timeSlot IN ('MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'BANK_HOLIDAY', 'ALL_DAY')),
  driverId INTEGER,
  totalAmount DECIMAL(10, 2) NOT NULL,
  subtotalAmount DECIMAL(10, 2),
  taxAmount DECIMAL(10, 2),
  deliveryStatus BOOLEAN DEFAULT FALSE,
  paymentStatus BOOLEAN DEFAULT FALSE,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (customerId) REFERENCES customers (id) ON DELETE CASCADE,
  FOREIGN KEY (driverId) REFERENCES drivers (id) ON DELETE SET NULL
);` as const

// const SAMPLE_ORDE = `
// DELETE FROM customerUnpaidStats;
// DELETE FROM orderRows;
// DELETE FROM orders;
// INSERT INTO orders (id, orderNumber, customerId, orderDate, deliveryDate, timeSlot, driverId, totalAmount, subtotalAmount, taxAmount, deliveryStatus, paymentStatus, notes) VALUES
// (1, 1, 1, '2025-10-01 10:00:00', '2025-10-05 00:00:00', 'BANK_HOLIDAY', 1, 150.75, 130.00, 20.75, 0, 0, 'First order notes'),
// (2, 2, 2, '2025-10-02 11:30:00', '2025-10-06 09:00:00', 'MORNING', 2, 250.00, 210.00, 40.00, 1, 1, 'Second order notes'),
// (3, 3, 1, '2025-10-03 09:15:00', '2025-10-07 12:00:00', 'AFTERNOON', NULL, 300.50, 270.00, 30.50, 0, 0, 'Third order notes');
// INSERT INTO orderRows (orderId, productId, quantity, unitPrice, totalPrice, taxAmount, totalGrossPrice, taxRate) VALUES
// (1, 1, 2, 50.00, 100.00, 22.00, 122.00, 22.00),
// (1, 2, 1, 50.75, 50.75, 11.17, 61.92, 22.00),
// (2, 2, 3, 50.00, 150.00, 33.00, 183.00, 22.00),
// (3, 1, 1, 50.00, 50.00, 11.00, 61.00, 22.00),
// (3, 3, 5, 50.10, 250.50, 55.11, 305.61, 22.00);
// ` as const

const TABLE_ORDERS_ROWS_INIT = `
CREATE TABLE IF NOT EXISTS orderRows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orderId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unitPrice DECIMAL(10, 2) NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL,
  taxAmount DECIMAL(10, 2) NOT NULL,
  totalGrossPrice DECIMAL(10, 2) NOT NULL,
  taxRate DECIMAL(5, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE,
  deletedAt TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
);` as const

const TABLE_DRIVERS_INIT = `
CREATE TABLE IF NOT EXISTS drivers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  driverCode VARCHAR(20) NOT NULL UNIQUE,
  driverName VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE
);` as const

const TABLE_CUSTOMERS_UNPAID_STATS_INIT = `
CREATE TABLE IF NOT EXISTS customerUnpaidStats (
  customerId INTEGER PRIMARY KEY,
  unpaidOrdersCount INTEGER NOT NULL DEFAULT 0,
  totalUnpaidAmount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES customers (id) ON DELETE CASCADE
);` as const

const TABLE_STORAGE_INIT = `
CREATE TABLE IF NOT EXISTS storage (
  productId INTEGER PRIMARY KEY,
  quantity INTEGER NOT NULL DEFAULT 0,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
);` as const

const TRIGGER_UPDATE_CUSTOMER_UNPAID_STATS_INIT = `
CREATE TRIGGER IF NOT EXISTS update_unpaid_stats_on_order_change
AFTER INSERT ON ORDERS
FOR EACH ROW
WHEN NEW.paymentStatus = 0 AND new.isActive = 1
BEGIN
    INSERT INTO customerUnpaidStats (customerId, unpaidOrdersCount, totalUnpaidAmount, lastUpdated)
    VALUES (NEW.customerId, 1, NEW.totalAmount, CURRENT_TIMESTAMP)
    ON CONFLICT(customerId) DO UPDATE SET
        unpaidOrdersCount = unpaidOrdersCount + 1,
        totalUnpaidAmount = totalUnpaidAmount + NEW.totalAmount,
        lastUpdated = CURRENT_TIMESTAMP;
END;
CREATE TRIGGER IF NOT EXISTS update_unpaid_stats_on_payment
AFTER UPDATE OF paymentStatus ON orders
FOR EACH ROW
WHEN OLD.paymentStatus = 0 AND NEW.paymentStatus = 1 AND NEW.isActive = 1
BEGIN
  UPDATE customerUnpaidStats
  SET unpaidOrdersCount = CASE 
      WHEN unpaidOrdersCount > 0 THEN unpaidOrdersCount - 1 
      ELSE 0 
    END,
    totalUnpaidAmount = CASE 
      WHEN totalUnpaidAmount >= OLD.totalAmount THEN totalUnpaidAmount - OLD.totalAmount 
      ELSE 0 
    END,
    lastUpdated = CURRENT_TIMESTAMP
  WHERE customerId = OLD.customerId;  
  DELETE FROM customerUnpaidStats 
  WHERE customerId = OLD.customerId 
    AND unpaidOrdersCount = 0;
END;
CREATE TRIGGER IF NOT EXISTS update_unpaid_stats_on_unpayment
AFTER UPDATE OF paymentStatus ON orders
FOR EACH ROW
WHEN OLD.paymentStatus = 1 AND NEW.paymentStatus = 0 AND NEW.isActive = 1
BEGIN
  INSERT INTO customerUnpaidStats (customerId, unpaidOrdersCount, totalUnpaidAmount, lastUpdated)
  VALUES (NEW.customerId, 1, NEW.totalAmount, CURRENT_TIMESTAMP)
  ON CONFLICT(customerId) DO UPDATE SET
    unpaidOrdersCount = unpaidOrdersCount + 1,
    totalUnpaidAmount = totalUnpaidAmount + NEW.totalAmount,
    lastUpdated = CURRENT_TIMESTAMP;
END;
CREATE TRIGGER IF NOT EXISTS update_unpaid_stats_on_amount_change
AFTER UPDATE OF totalAmount ON orders
FOR EACH ROW
WHEN NEW.paymentStatus = 0 AND NEW.isActive = 1 AND OLD.totalAmount != NEW.totalAmount
BEGIN
  UPDATE customerUnpaidStats
  SET totalUnpaidAmount = totalUnpaidAmount - OLD.totalAmount + NEW.totalAmount,
    lastUpdated = CURRENT_TIMESTAMP
  WHERE customerId = NEW.customerId;
END;
CREATE TRIGGER IF NOT EXISTS update_unpaid_stats_on_order_delete
AFTER UPDATE OF isActive ON orders
FOR EACH ROW
WHEN OLD.isActive = 1 AND NEW.isActive = 0 AND OLD.paymentStatus = 0
BEGIN
  UPDATE customerUnpaidStats
  SET unpaidOrdersCount = CASE 
      WHEN unpaidOrdersCount > 0 THEN unpaidOrdersCount - 1 
      ELSE 0 
    END,
    totalUnpaidAmount = CASE 
      WHEN totalUnpaidAmount >= OLD.totalAmount THEN totalUnpaidAmount - OLD.totalAmount 
      ELSE 0 
    END,
    lastUpdated = CURRENT_TIMESTAMP
  WHERE customerId = OLD.customerId;
  
  DELETE FROM customerUnpaidStats 
  WHERE customerId = OLD.customerId 
    AND unpaidOrdersCount = 0;
END;
`

const TRIGGER_UPDATE_STORAGE_ON_ORDER_ROW_INSERT = `
CREATE TRIGGER IF NOT EXISTS update_storage_on_order_row_insert
AFTER INSERT ON orderRows
FOR EACH ROW
BEGIN
    UPDATE storage
    SET quantity = quantity - NEW.quantity,
        lastUpdated = CURRENT_TIMESTAMP
    WHERE productId = NEW.productId;

    INSERT INTO storage (productId, quantity, lastUpdated)
    SELECT NEW.productId, -NEW.quantity, CURRENT_TIMESTAMP
    WHERE (SELECT changes() = 0);
END;
` as const

const CLEANUP_OLD_DELETED_RECORDS = `
DELETE FROM customers WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
DELETE FROM suppliers WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
DELETE FROM products WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
DELETE FROM orderRows WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
DELETE FROM orders WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
DELETE FROM drivers WHERE isActive = 0 AND deletedAt IS NOT NULL AND deletedAt <= datetime('now', '-2 days');
` as const


export const initQuery = `
PRAGMA foreign_keys = ON;
${TABLE_CUSTOMERS_INIT}
${TABLE_SUPPLIERS_INIT}
${TABLE_PRODUCTS_INIT}
${TABLE_ORDERS_INIT}
${TABLE_ORDERS_ROWS_INIT}
${TABLE_DRIVERS_INIT}
${TABLE_STORAGE_INIT}
${TABLE_CUSTOMERS_UNPAID_STATS_INIT}
${TRIGGER_UPDATE_CUSTOMER_UNPAID_STATS_INIT}
${TRIGGER_UPDATE_STORAGE_ON_ORDER_ROW_INSERT}
${CLEANUP_OLD_DELETED_RECORDS}
${GENERATE_INDEXES}
` as const
