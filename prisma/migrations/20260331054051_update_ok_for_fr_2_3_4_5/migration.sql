/*
  Warnings:

  - Added the required column `description` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SLATask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "urlProject" TEXT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SLATask" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
