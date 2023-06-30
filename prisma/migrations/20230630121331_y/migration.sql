-- DropForeignKey
ALTER TABLE `tbl_itemmaster` DROP FOREIGN KEY `tbl_itemmaster_tbl_srate_id_fkey`;

-- DropIndex
DROP INDEX `tbl_categorymaster_Category_Id_fkey` ON `tbl_categorymaster`;

-- DropIndex
DROP INDEX `tbl_srate_Rate_ID_key` ON `tbl_srate`;

-- AddForeignKey
ALTER TABLE `tbl_itemmaster` ADD CONSTRAINT `tbl_itemmaster_tbl_srate_id_fkey` FOREIGN KEY (`tbl_srate_id`) REFERENCES `tbl_srate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
