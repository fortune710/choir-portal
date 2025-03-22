/*
  Warnings:

  - A unique constraint covering the columns `[eventId,songId]` on the table `EventSong` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId,teamId]` on the table `EventTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EventTeam" ADD COLUMN     "coordinatorUserId" TEXT;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "meetingUrl" TEXT,
ADD COLUMN     "prayerPoints" TEXT;

-- CreateTable
CREATE TABLE "EventMember" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventMember_eventId_memberId_key" ON "EventMember"("eventId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "EventSong_eventId_songId_key" ON "EventSong"("eventId", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "EventTeam_eventId_teamId_key" ON "EventTeam"("eventId", "teamId");

-- AddForeignKey
ALTER TABLE "EventTeam" ADD CONSTRAINT "EventTeam_coordinatorUserId_fkey" FOREIGN KEY ("coordinatorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMember" ADD CONSTRAINT "EventMember_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMember" ADD CONSTRAINT "EventMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
