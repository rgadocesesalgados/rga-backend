-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_order_id_fkey";

-- AlterTable
ALTER TABLE "order_products" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
