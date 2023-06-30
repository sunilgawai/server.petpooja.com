/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Salesman` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Salesman_username_key` ON `Salesman`(`username`);
