-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_cart_id_fkey`;

-- AlterTable
ALTER TABLE `table` MODIFY `cart_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
