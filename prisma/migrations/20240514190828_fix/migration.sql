/*
  Warnings:

  - The values [CHANTILLLY] on the enum `Cobertura` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Cobertura_new" AS ENUM ('CHANTILLY', 'NATA', 'CLARA_QUEIMADA', 'AVELA_BATIDO');
ALTER TABLE "bolos" ALTER COLUMN "cobertura" DROP DEFAULT;
ALTER TABLE "bolos" ALTER COLUMN "cobertura" TYPE "Cobertura_new" USING ("cobertura"::text::"Cobertura_new");
ALTER TYPE "Cobertura" RENAME TO "Cobertura_old";
ALTER TYPE "Cobertura_new" RENAME TO "Cobertura";
DROP TYPE "Cobertura_old";
ALTER TABLE "bolos" ALTER COLUMN "cobertura" SET DEFAULT 'CHANTILLY';
COMMIT;

-- AlterTable
ALTER TABLE "bolos" ALTER COLUMN "cobertura" SET DEFAULT 'CHANTILLY';
