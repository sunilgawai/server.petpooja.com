-- AddForeignKey
ALTER TABLE `tbl_categorymaster` ADD CONSTRAINT `tbl_categorymaster_Category_Id_fkey` FOREIGN KEY (`Category_Id`) REFERENCES `tbl_categorygroupmaster`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
