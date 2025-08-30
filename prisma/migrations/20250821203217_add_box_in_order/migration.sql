-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
