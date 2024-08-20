/*
  Warnings:

  - You are about to drop the column `activated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNo` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "phoneNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activated",
DROP COLUMN "phoneNo",
ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isadmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ismanager" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilecomplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "restricted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Admin";
