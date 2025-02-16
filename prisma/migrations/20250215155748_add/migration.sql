/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_slug_key" ON "Analysis"("slug");
