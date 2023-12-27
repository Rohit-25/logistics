/*
  Warnings:

  - You are about to drop the column `doamin` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `rolepermissonId` on the `role` table. All the data in the column will be lost.
  - You are about to drop the `rolepermisson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_rolepermissonId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermisson` DROP FOREIGN KEY `Rolepermisson_menuId_fkey`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `doamin`,
    DROP COLUMN `rolepermissonId`;

-- DropTable
DROP TABLE `rolepermisson`;

-- CreateTable
CREATE TABLE `Permisson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUsers_AB_unique`(`A`, `B`),
    INDEX `_RoleToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissonToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissonToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissonToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MenuToPermisson` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MenuToPermisson_AB_unique`(`A`, `B`),
    INDEX `_MenuToPermisson_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RoleToUsers` ADD CONSTRAINT `_RoleToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUsers` ADD CONSTRAINT `_RoleToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissonToRole` ADD CONSTRAINT `_PermissonToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permisson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissonToRole` ADD CONSTRAINT `_PermissonToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MenuToPermisson` ADD CONSTRAINT `_MenuToPermisson_A_fkey` FOREIGN KEY (`A`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MenuToPermisson` ADD CONSTRAINT `_MenuToPermisson_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permisson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
