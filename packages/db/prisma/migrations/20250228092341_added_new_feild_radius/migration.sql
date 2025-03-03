/*
  Warnings:

  - Made the column `radius` on table `Element` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "radius" SET NOT NULL;
