/*
  Warnings:

  - Added the required column `cidade` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "cidade" TEXT NOT NULL;
