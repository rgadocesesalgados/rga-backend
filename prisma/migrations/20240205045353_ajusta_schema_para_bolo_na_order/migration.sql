-- AlterTable
ALTER TABLE "toppers" ADD COLUMN     "description" TEXT,
ADD COLUMN     "idade" INTEGER,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "price" SET DEFAULT 15;
