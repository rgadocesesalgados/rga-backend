-- DropForeignKey
ALTER TABLE "outs" DROP CONSTRAINT "outs_supplier_id_fkey";

-- AddForeignKey
ALTER TABLE "outs" ADD CONSTRAINT "outs_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
