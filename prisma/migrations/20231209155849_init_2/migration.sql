/*
  Warnings:

  - You are about to drop the column `name` on the `Community` table. All the data in the column will be lost.
  - Added the required column `title` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Community" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Community_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Community" ("adminId", "createdAt", "description", "id", "slug", "updatedAt") SELECT "adminId", "createdAt", "description", "id", "slug", "updatedAt" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE UNIQUE INDEX "Community_slug_key" ON "Community"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
