/*
  Warnings:

  - A unique constraint covering the columns `[Rate_ID]` on the table `tbl_srate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `tbl_categorymaster` DROP FOREIGN KEY `tbl_categorymaster_Category_Id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_itemmaster` DROP FOREIGN KEY `tbl_itemmaster_tbl_srate_id_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_srate_Rate_ID_key` ON `tbl_srate`(`Rate_ID`);

-- AddForeignKey
ALTER TABLE `tbl_itemmaster` ADD CONSTRAINT `tbl_itemmaster_tbl_srate_id_fkey` FOREIGN KEY (`tbl_srate_id`) REFERENCES `tbl_srate`(`Rate_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
