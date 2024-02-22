-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "address_complete" TEXT,
ADD COLUMN     "frete_carro" DOUBLE PRECISION DEFAULT 10,
ADD COLUMN     "frete_moto" DOUBLE PRECISION DEFAULT 5;
