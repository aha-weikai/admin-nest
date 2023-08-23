/*
  Warnings:

  - Added the required column `saltId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `saltId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Salt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_saltId_fkey` FOREIGN KEY (`saltId`) REFERENCES `Salt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
