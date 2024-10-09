-- CreateTable
CREATE TABLE "outs" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "outs" ADD CONSTRAINT "outs_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
