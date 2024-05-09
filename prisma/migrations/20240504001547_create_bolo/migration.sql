-- DropForeignKey
ALTER TABLE "bolos" DROP CONSTRAINT "bolos_order_id_fkey";

-- AlterTable
ALTER TABLE "bolos" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bolos" ADD CONSTRAINT "bolos_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
