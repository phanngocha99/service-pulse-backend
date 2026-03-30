-- AlterTable
ALTER TABLE "MMGroupRole" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "MMRolePermission" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "MMUserGroup" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
