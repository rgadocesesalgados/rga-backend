/*
  Warnings:

  - Made the column `id` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
