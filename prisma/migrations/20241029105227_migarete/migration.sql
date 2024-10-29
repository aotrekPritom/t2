/*
  Warnings:

  - Added the required column `article` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectures` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resources` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeDuration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "article" INTEGER NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "lectures" INTEGER NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "resources" INTEGER NOT NULL,
ADD COLUMN     "section" INTEGER NOT NULL,
ADD COLUMN     "timeDuration" INTEGER NOT NULL,
ADD COLUMN     "topics" TEXT[];

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
