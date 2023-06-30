-- AlterTable
ALTER TABLE `order` ADD COLUMN `salesman_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_salesman_id_fkey` FOREIGN KEY (`salesman_id`) REFERENCES `Salesman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
