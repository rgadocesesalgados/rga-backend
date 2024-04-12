/*
  Warnings:

  - The values [CREDIT,DEBIT,MONEY,DUPLICATE] on the enum `payment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "payment_new" AS ENUM ('CREDITO', 'DEBITO', 'DINHEIRO', 'PIX', 'DUPLICATA');
ALTER TABLE "orders" ALTER COLUMN "payment" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "payment" TYPE "payment_new" USING ("payment"::text::"payment_new");
ALTER TYPE "payment" RENAME TO "payment_old";
ALTER TYPE "payment_new" RENAME TO "payment";
DROP TYPE "payment_old";
ALTER TABLE "orders" ALTER COLUMN "payment" SET DEFAULT 'DINHEIRO';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "payment" SET DEFAULT 'DINHEIRO';
