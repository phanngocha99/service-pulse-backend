/*
  Warnings:

  - A unique constraint covering the columns `[action,resource,scope,fields]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Permission_action_resource_scope_key";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_resource_scope_fields_key" ON "Permission"("action", "resource", "scope", "fields");
