-- CreateEnum
CREATE TYPE "TypeFrete" AS ENUM ('FRETE_MOTO', 'FRETE_CARRO');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "type_frete" "TypeFrete" NOT NULL DEFAULT 'FRETE_MOTO',
ADD COLUMN     "value_frete" DOUBLE PRECISION;
