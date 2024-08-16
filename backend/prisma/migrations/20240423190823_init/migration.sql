/*
  Warnings:

  - The `image` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `material` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
