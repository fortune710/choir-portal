/*
  Warnings:

  - The values [SPECIAL] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('REHEARSAL', 'SERVICE', 'AUXILIARY', 'PRAYER', 'WORKSHOP');
ALTER TABLE "Events" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "dressCode" TEXT,
ADD COLUMN     "eventLeadUserId" TEXT,
ADD COLUMN     "guestLead" TEXT,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentEventId" TEXT,
ADD COLUMN     "recurrenceEndDate" TIMESTAMP(3),
ADD COLUMN     "recurrenceRule" TEXT;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "key" TEXT,
ADD COLUMN     "lyrics" TEXT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "coordinator_user_id" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "vocalCategory" TEXT;

-- CreateTable
CREATE TABLE "EventSong" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_coordinator_user_id_fkey" FOREIGN KEY ("coordinator_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_parentEventId_fkey" FOREIGN KEY ("parentEventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_eventLeadUserId_fkey" FOREIGN KEY ("eventLeadUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSong" ADD CONSTRAINT "EventSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSong" ADD CONSTRAINT "EventSong_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
