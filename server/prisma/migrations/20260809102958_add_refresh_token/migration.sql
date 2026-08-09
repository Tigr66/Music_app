/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "token",
ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");
