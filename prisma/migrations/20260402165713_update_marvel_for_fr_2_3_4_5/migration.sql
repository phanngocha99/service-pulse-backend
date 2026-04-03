/*
  Warnings:

  - You are about to drop the column `userId` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `MMGroupRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MMRolePermission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MMUserGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultgroupId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MMGroupRole` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `MMGroupRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `MMGroupRole` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MMRolePermission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `MMRolePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `MMRolePermission` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MMUserGroup` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `MMUserGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `MMUserGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "MMGroupRole" DROP CONSTRAINT "MMGroupRole_createdById_fkey";

-- DropForeignKey
ALTER TABLE "MMGroupRole" DROP CONSTRAINT "MMGroupRole_groupId_fkey";

-- DropForeignKey
ALTER TABLE "MMGroupRole" DROP CONSTRAINT "MMGroupRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "MMRolePermission" DROP CONSTRAINT "MMRolePermission_createdById_fkey";

-- DropForeignKey
ALTER TABLE "MMRolePermission" DROP CONSTRAINT "MMRolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "MMRolePermission" DROP CONSTRAINT "MMRolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "MMUserGroup" DROP CONSTRAINT "MMUserGroup_createdById_fkey";

-- DropForeignKey
ALTER TABLE "MMUserGroup" DROP CONSTRAINT "MMUserGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "MMUserGroup" DROP CONSTRAINT "MMUserGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_updatedById_fkey";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "groupId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "defaultgroupId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MMGroupRole" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MMRolePermission" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MMUserGroup" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL,
ALTER COLUMN "fields" SET DEFAULT ARRAY['id']::TEXT[];

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MMGroupRole_id_key" ON "MMGroupRole"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MMRolePermission_id_key" ON "MMRolePermission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MMUserGroup_id_key" ON "MMUserGroup"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMUserGroup" ADD CONSTRAINT "MMUserGroup_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMUserGroup" ADD CONSTRAINT "MMUserGroup_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMUserGroup" ADD CONSTRAINT "MMUserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMUserGroup" ADD CONSTRAINT "MMUserGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMGroupRole" ADD CONSTRAINT "MMGroupRole_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMGroupRole" ADD CONSTRAINT "MMGroupRole_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMGroupRole" ADD CONSTRAINT "MMGroupRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMGroupRole" ADD CONSTRAINT "MMGroupRole_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMRolePermission" ADD CONSTRAINT "MMRolePermission_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMRolePermission" ADD CONSTRAINT "MMRolePermission_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMRolePermission" ADD CONSTRAINT "MMRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MMRolePermission" ADD CONSTRAINT "MMRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_defaultgroupId_fkey" FOREIGN KEY ("defaultgroupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
