/*
  Warnings:

  - You are about to drop the column `decoracao` on the `bolos` table. All the data in the column will be lost.
  - The `cobertura` column on the `bolos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `massa` column on the `bolos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `hour` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Formato" AS ENUM ('REDONDO', 'QUADRADO');

-- CreateEnum
CREATE TYPE "Cobertura" AS ENUM ('CHANTILLLY', 'NATA', 'CLARA_QUEIMADA', 'AVELA_BATIDO');

-- CreateEnum
CREATE TYPE "Massa" AS ENUM ('BRANCA', 'CHOCOLATE', 'MASSA_MESCLADA');

-- AlterTable
ALTER TABLE "bolos" DROP COLUMN "decoracao",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "formato" "Formato" NOT NULL DEFAULT 'REDONDO',
DROP COLUMN "cobertura",
ADD COLUMN     "cobertura" "Cobertura" NOT NULL DEFAULT 'CHANTILLLY',
DROP COLUMN "massa",
ADD COLUMN     "massa" "Massa" NOT NULL DEFAULT 'BRANCA';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "hour" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;
