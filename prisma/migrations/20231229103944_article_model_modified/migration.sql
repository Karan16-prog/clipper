/*
  Warnings:

  - You are about to drop the column `img` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `isValidLink` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Article` table. All the data in the column will be lost.
  - Added the required column `url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "img",
DROP COLUMN "isValidLink",
DROP COLUMN "link",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "domain" DROP NOT NULL;
