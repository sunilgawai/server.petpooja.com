/*
  Warnings:

  - You are about to drop the column `customer_id` on the `cart` table. All the data in the column will be lost.
  - You are about to alter the column `payment_status` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - Added the required column `customer_first_name` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_last_name` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_mobile` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `customer_id`,
    ADD COLUMN `customer_first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `customer_last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `customer_mobile` VARCHAR(191) NOT NULL,
    MODIFY `payment_status` VARCHAR(191) NULL;
