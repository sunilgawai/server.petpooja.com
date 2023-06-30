/*
  Warnings:

  - You are about to drop the column `item_id` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cart_table_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_table_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemmaster_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_cart_id_fkey`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `cart_table_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `item_id`,
    ADD COLUMN `itemmaster_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `table`;

-- CreateTable
CREATE TABLE `CartTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_table_id` VARCHAR(191) NOT NULL,
    `cart_table_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CartTable_cart_table_name_key`(`cart_table_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_cart_table_id_key` ON `Cart`(`cart_table_id`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_cart_table_id_fkey` FOREIGN KEY (`cart_table_id`) REFERENCES `CartTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_itemmaster_id_fkey` FOREIGN KEY (`itemmaster_id`) REFERENCES `tbl_itemmaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
