/*
  Warnings:

  - You are about to drop the column `createdById` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_updatedById_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdById",
DROP COLUMN "updatedAt",
DROP COLUMN "updatedById";
