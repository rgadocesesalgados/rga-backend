/*
  Warnings:

  - You are about to drop the column `draft` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `retired` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'DUPLICATA');

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_address_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_address_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "draft",
DROP COLUMN "paid",
DROP COLUMN "payment",
DROP COLUMN "retired",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'RASCUNHO';

-- DropTable
DROP TABLE "address";

-- DropEnum
DROP TYPE "payment";

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "ponto_de_referencia" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "frete_moto" DOUBLE PRECISION DEFAULT 5,
    "frete_carro" DOUBLE PRECISION DEFAULT 10,
    "address_complete" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "type" "PaymentType" NOT NULL DEFAULT 'DINHEIRO',
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
