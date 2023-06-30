-- CreateTable
CREATE TABLE `Salesman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesman_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(191) NULL,
    `cart_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `payment_status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_itemmaster` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Item_Id` INTEGER NOT NULL,
    `Item_Code` VARCHAR(255) NULL,
    `tbl_categorymaster_id` INTEGER NOT NULL,
    `Item_Name` VARCHAR(255) NULL,
    `Item_Description` VARCHAR(255) NULL,
    `Item_UOM` VARCHAR(255) NULL,
    `tbl_srate_id` INTEGER NOT NULL,
    `Item_Location` VARCHAR(255) NULL,
    `Item_Manufacturer` VARCHAR(255) NULL,
    `Item_OrderPlaceTime` DATETIME(0) NULL,
    `Item_DeliverySchedule` VARCHAR(255) NULL,
    `Item_Egg` VARCHAR(255) NULL,
    `Item_Veg` VARCHAR(255) NULL,
    `Item_Expiry` INTEGER NULL,
    `Item_MaxOrderLevel` INTEGER NULL,
    `Item_MinOrderLevel` INTEGER NULL,
    `Item_ReorderLevel` INTEGER NULL,
    `Item_MOQ` INTEGER NULL,
    `Increment_Factor_For_additional_Qty` FLOAT NULL,
    `Item_FlavourId` INTEGER NULL,
    `Item_Discontinued` BOOLEAN NULL,
    `Item_Favourite` VARCHAR(255) NULL,
    `Item_FixWeight` FLOAT NULL,
    `Item_DeliverySchedule2` VARCHAR(255) NULL,
    `Item_DeliverySchedule9` VARCHAR(255) NULL,
    `Item_DeliveryDays` VARCHAR(255) NULL,
    `Item_Falvours2` TEXT NULL,
    `Item_Flavours9` TEXT NULL,
    `Item_MinQty` INTEGER NULL,
    `Item_Image` TEXT NULL,
    `Item_IsMinQtyMandatory` BOOLEAN NULL,
    `Item_IsShapeRequired` BOOLEAN NULL,
    `Item_Shapes` VARCHAR(255) NULL,
    `Item_ShortName` VARCHAR(255) NULL,
    `Item_Type` VARCHAR(255) NULL,
    `Item_IsSpecial` VARCHAR(255) NULL,
    `Item_UnitID` INTEGER NULL,
    `Item_ChapterID` INTEGER NULL,
    `Item_TaxID` INTEGER NULL,
    `Item_FreightRatePercentage` FLOAT NULL,
    `Item_MaxWeight` FLOAT NULL,
    `Item_IsRemarkRequired` BOOLEAN NULL,
    `Item_PackagingTypeID` INTEGER NULL,
    `Item_Large` BOOLEAN NULL,
    `Item_IsExcisable` BOOLEAN NULL,
    `Item_LeadTime` INTEGER NULL,
    `IsAvailableForUrgentOrder` BOOLEAN NULL,
    `CalculateExciseOnMRP` BOOLEAN NULL,
    `Rack_ID` INTEGER NULL,
    `ItemsPerTray` INTEGER NULL,
    `NoOfDaysToManufacture` INTEGER NULL,
    `Station_ID` INTEGER NULL,
    `Item_OrderTypes` VARCHAR(255) NULL,
    `DiscountPercentage` FLOAT NULL,
    `MarginPercentage` FLOAT NULL,
    `Item_EANCode` VARCHAR(255) NULL,
    `AllowRateEditing` BOOLEAN NULL,
    `AllowNegativeStock` BOOLEAN NULL,
    `Item_HSNCode` VARCHAR(255) NULL,
    `NoOfPieces` INTEGER NULL,
    `ProductType` VARCHAR(255) NULL,
    `IsAssemblyItem` BOOLEAN NULL,
    `UrgentOrderShapes` VARCHAR(255) NULL,
    `UrgentOrderFlavours` VARCHAR(255) NULL,
    `IsItemReturnable` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_srate` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Rate_ID` INTEGER NOT NULL,
    `Item_Code` VARCHAR(255) NULL,
    `Item_Rate` FLOAT NULL,
    `Rate_IsEffective` BOOLEAN NULL,
    `Rate_EffectiveFrom` DATETIME(0) NULL,
    `Rate_EffectiveTo` DATETIME(0) NULL,
    `Item_BillingRate` FLOAT NULL,
    `Shape_ID` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `Shop_Code` VARCHAR(255) NOT NULL,
    `customer_first_name` VARCHAR(255) NOT NULL,
    `customer_last_name` VARCHAR(255) NOT NULL,
    `customer_email` VARCHAR(255) NOT NULL,
    `customer_mobile` VARCHAR(255) NOT NULL,
    `date_purchased` DATETIME(0) NULL,
    `order_price` VARCHAR(255) NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `payment_status` VARCHAR(255) NOT NULL DEFAULT '1',
    `order_status` VARCHAR(255) NOT NULL DEFAULT '1',
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_products` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `item_id` INTEGER NOT NULL,
    `item_quantity` INTEGER NOT NULL,
    `products_name` VARCHAR(255) NULL,
    `products_image` VARCHAR(255) NULL,
    `products_unit_price` VARCHAR(255) NULL,
    `products_totalPrice` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255) NULL,
    `product_slug` VARCHAR(255) NULL,
    `product_description` TEXT NULL,
    `product_image` VARCHAR(255) NULL,
    `product_mrp` VARCHAR(255) NULL,
    `product_max_stock` VARCHAR(255) NULL,
    `product_status` BOOLEAN NULL,
    `category_id` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_images` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` VARCHAR(255) NULL,
    `product_image` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categorymaster` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Category_Id` INTEGER NOT NULL,
    `Category_Name` VARCHAR(255) NOT NULL,
    `Category_Discontinued` BOOLEAN NOT NULL,
    `Category_Code` VARCHAR(255) NULL,
    `IsSpecial` VARCHAR(255) NULL,
    `Chapter_ID` INTEGER NULL,
    `CategoryGroup_ID` INTEGER NULL,
    `Sort_Index` INTEGER NULL,
    `Category_HSNCode` VARCHAR(255) NULL,
    `Series` VARCHAR(255) NULL,
    `BusinessType_ID` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categorygroupmaster` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `ID` INTEGER NOT NULL,
    `Category_GroupCode` VARCHAR(255) NULL,
    `Category_GroupName` VARCHAR(255) NULL,
    `Sort_Index` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_customerdetails` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Cust_Id` INTEGER NOT NULL,
    `Cust_Name` VARCHAR(255) NULL,
    `Cust_Addr` VARCHAR(255) NULL,
    `Cust_ContactlNo` VARCHAR(255) NULL,
    `Cust_CellNo` VARCHAR(255) NULL,
    `Landmark` VARCHAR(255) NULL,
    `Cust_EmailID` VARCHAR(255) NULL,
    `Pincode` VARCHAR(255) NULL,
    `BirthDate` DATETIME(0) NULL,
    `Gender` VARCHAR(255) NULL,
    `AnniversaryDate` DATETIME(0) NULL,
    `Profession` VARCHAR(255) NULL,
    `CreatedDate` DATETIME(0) NULL,
    `CreatedByUserID` INTEGER NULL,
    `GSTIN` VARCHAR(255) NULL,
    `Cust_Code` VARCHAR(255) NULL,
    `ContactPerson` VARCHAR(255) NULL,
    `Country_ID` INTEGER NULL,
    `State_ID` INTEGER NULL,
    `City_ID` INTEGER NULL,
    `DiscountPercentage` FLOAT NULL,
    `Reference` VARCHAR(255) NULL,
    `synced` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_paymentmaster` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PaymentModeCode` VARCHAR(255) NULL,
    `PaymentModeName` VARCHAR(255) NULL,
    `Description` VARCHAR(255) NULL,
    `IsDeleted` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Shop_Code` VARCHAR(255) NULL,
    `Sale_Id` INTEGER NULL,
    `Sale_Type` VARCHAR(255) NULL,
    `Sale_Number` VARCHAR(255) NULL,
    `Sale_DateTime` DATETIME(0) NULL,
    `Sale_NoOfItems` INTEGER NULL,
    `Sale_IsDeleted` BOOLEAN NULL,
    `AdvSale_DateTime` DATETIME(0) NULL,
    `Sale_By_Id` INTEGER NULL,
    `Sale_Deleted_By_Id` INTEGER NULL,
    `SaleDeletion_DateTime` DATETIME(0) NULL,
    `Sale_CounterID` INTEGER NULL,
    `IsGSTApplicable` BOOLEAN NULL,
    `Cust_ID` INTEGER NULL,
    `Sale_ModifiedDateTime` DATETIME(0) NULL,
    `Sale_ModifiedBy_UserID` INTEGER NULL,
    `AmountReceivedFromCustomer` FLOAT NULL,
    `AdvOrder_Number` VARCHAR(255) NULL,
    `TableNumber` VARCHAR(255) NULL,
    `HappyHourDiscountID` INTEGER NULL,
    `OrderType_ID` INTEGER NULL,
    `CreatedDateTime` DATETIME(0) NULL,
    `PayTypeBillNo` VARCHAR(255) NULL,
    `synced` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `Cust_ContactlNo` VARCHAR(255) NULL,
    `Sale_Number_Temp` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_saleitem` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Sale_Id` INTEGER NOT NULL,
    `Item_ID` VARCHAR(255) NOT NULL,
    `SaleItem_Qty` FLOAT NOT NULL,
    `SaleItem_Amount` FLOAT NOT NULL,
    `SaleItem_DiscountPercent` FLOAT NULL,
    `SaleItem_DiscountAmount` FLOAT NULL,
    `SaleItem_Weight` FLOAT NULL,
    `SaleItem_FlavourID` INTEGER NULL,
    `SaleItem_MaxFixRate` FLOAT NULL,
    `SaleItem_MaxIncrRate` FLOAT NULL,
    `SaleItem_FixWeight` FLOAT NULL,
    `SaleItem_Shape` VARCHAR(255) NULL,
    `SaleItem_EggStatus` INTEGER NULL,
    `SaleItem_Remark` VARCHAR(255) NULL,
    `SaleItem_ShapeID` INTEGER NULL,
    `SaleItem_FinalAmount` FLOAT NULL,
    `HappyHourDiscountPercentage` FLOAT NULL,
    `Tax_ID` INTEGER NULL,
    `TaxPercentage` FLOAT NULL,
    `CGST_Percentage` FLOAT NULL,
    `SGST_Percentage` FLOAT NULL,
    `IGST_Percentage` FLOAT NULL,
    `ItemDiscountPercentage` FLOAT NULL,
    `Unit_ID` INTEGER NULL,
    `synced` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `Sale_Number` VARCHAR(255) NULL,
    `Sale_Number_Temp` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_salenumbers` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `ID` INTEGER NOT NULL,
    `Sale_Number` VARCHAR(255) NULL,
    `InUse` BOOLEAN NULL,
    `synced` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `Sale_Number_Temp` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_salepaymentdetails` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SalePayment_ID` INTEGER NULL,
    `Sale_ID` INTEGER NULL,
    `SaleSpecial_PaymentMode` VARCHAR(255) NULL,
    `SalePayment_Amount` FLOAT NULL,
    `SalePayment_Date` DATETIME(0) NULL,
    `Created_Date` DATETIME(0) NULL,
    `PaymentSaleType_ID` INTEGER NULL,
    `synced` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `Sale_Number_Temp` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_shopitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Shop_Code` VARCHAR(255) NOT NULL,
    `Shop_ID` INTEGER NULL,
    `Item_ID` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_shopmaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Shop_ID` INTEGER NOT NULL,
    `Shop_Name` VARCHAR(255) NULL,
    `Shop_Address` TEXT NULL,
    `Shop_RegNumber` VARCHAR(255) NULL,
    `Shop_ContactNumber` VARCHAR(255) NULL,
    `Shop_ContactPerson` VARCHAR(255) NULL,
    `Shop_VatNumber` VARCHAR(255) NULL,
    `Shop_Message` VARCHAR(255) NULL,
    `StockFolderPath` VARCHAR(255) NULL,
    `Shop_Code` VARCHAR(255) NULL,
    `Route_ID` INTEGER NULL,
    `Shop_Email` VARCHAR(255) NULL,
    `Shop_PanNo` VARCHAR(255) NULL,
    `Shop_OfficeNo` VARCHAR(255) NULL,
    `GRMCharges` FLOAT NULL,
    `NoOfCounters` INTEGER NULL,
    `IsDiscontinue` BOOLEAN NULL,
    `Shop_Website` VARCHAR(255) NULL,
    `Shop_FaxNo` VARCHAR(255) NULL,
    `Shop_TinNo` VARCHAR(255) NULL,
    `Shop_GSTIN` VARCHAR(255) NULL,
    `Shop_AdharNumber` VARCHAR(255) NULL,
    `Shop_BankIDs` VARCHAR(255) NULL,
    `Shop_DefaultBankID` INTEGER NULL,
    `City_ID` INTEGER NULL,
    `State_ID` INTEGER NULL,
    `Country_ID` INTEGER NULL,
    `ShowEANCodeInInvoice` BOOLEAN NULL,
    `ShopType_ID` INTEGER NULL,
    `Password` VARCHAR(255) NULL,
    `PasswordStatus` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_stockdetails` (
    `Shop_Code` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Item_ID` VARCHAR(255) NULL,
    `Item_Qty` FLOAT NULL,
    `Item_Weight` FLOAT NULL,
    `Item_FlavCode` INTEGER NULL,
    `Item_LastUpdatedDateTime` DATETIME(0) NULL,
    `Item_LastUpdatedBy` VARCHAR(255) NULL,
    `Item_StorageStock` FLOAT NULL,
    `Item_PrvDayStock` FLOAT NULL,
    `Item_EggStatus` INTEGER NULL,
    `Shape_ID` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `tbl_itemmaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_itemmaster` ADD CONSTRAINT `tbl_itemmaster_tbl_categorymaster_id_fkey` FOREIGN KEY (`tbl_categorymaster_id`) REFERENCES `tbl_categorymaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_itemmaster` ADD CONSTRAINT `tbl_itemmaster_tbl_srate_id_fkey` FOREIGN KEY (`tbl_srate_id`) REFERENCES `tbl_srate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `tbl_itemmaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
