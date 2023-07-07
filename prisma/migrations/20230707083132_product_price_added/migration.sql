/*
  Warnings:

  - Added the required column `product_price` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `payment_status` VARCHAR(255) NULL DEFAULT '1';

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `product_price` INTEGER NOT NULL;
