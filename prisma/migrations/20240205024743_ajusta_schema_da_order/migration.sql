-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "retired" BOOLEAN NOT NULL DEFAULT false;
