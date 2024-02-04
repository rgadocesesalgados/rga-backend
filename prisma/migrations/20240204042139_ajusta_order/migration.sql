/*
  Warnings:

  - The `payment` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "payment" AS ENUM ('CREDIT', 'DEBIT', 'MONEY', 'PIX', 'DUPLICATE');

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "data" DROP NOT NULL,
ALTER COLUMN "total" SET DEFAULT 0,
DROP COLUMN "payment",
ADD COLUMN     "payment" "payment" NOT NULL DEFAULT 'MONEY';
