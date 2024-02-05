-- AlterTable
ALTER TABLE "bolos" ADD COLUMN     "massa" TEXT,
ALTER COLUMN "peso" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "cobertura" DROP NOT NULL,
ALTER COLUMN "decoracao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "cor_forminhas" TEXT,
ADD COLUMN     "observations" TEXT;
