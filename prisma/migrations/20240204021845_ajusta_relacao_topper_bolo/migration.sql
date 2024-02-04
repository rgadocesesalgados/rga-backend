-- DropForeignKey
ALTER TABLE "bolos" DROP CONSTRAINT "bolos_topper_id_fkey";

-- AlterTable
ALTER TABLE "bolos" ALTER COLUMN "topper_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bolos" ADD CONSTRAINT "bolos_topper_id_fkey" FOREIGN KEY ("topper_id") REFERENCES "toppers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
