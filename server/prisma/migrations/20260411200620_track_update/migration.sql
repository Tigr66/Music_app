/*
  Warnings:

  - A unique constraint covering the columns `[albumId,number]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_number_key" ON "Track"("albumId", "number");
