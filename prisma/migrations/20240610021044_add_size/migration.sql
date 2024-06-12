-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PP', 'P', 'M', 'G', 'GG', 'UNIT');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "size" "Size" NOT NULL DEFAULT 'UNIT';
