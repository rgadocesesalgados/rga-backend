-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_boxId_fkey";

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
