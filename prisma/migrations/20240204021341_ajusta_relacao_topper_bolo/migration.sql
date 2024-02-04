/*
  Warnings:

  - A unique constraint covering the columns `[topper_id]` on the table `bolos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bolos_topper_id_key" ON "bolos"("topper_id");
