import prisma from "@/lib/prisma";
import { Song } from "@prisma/client";

interface CreateSong extends Omit<Song, "id" | "created_at" | "updated_at"> {}

/*
  Get all songs
 */
export async function getSongs() {
  return await prisma.song.findMany();
}

/*
  Add a new song with YouTube & MP3 links
 */
export async function addSong(data: CreateSong) {
  return await prisma.song.create({ data });
}

/*
  Get a single song by ID
 */
export async function getSongById(id: string) {
  return await prisma.song.findUnique({ where: { id } });
}

/*
  Update an existing song (title, artist, links)
 */
export async function updateSong(id: string, data: Partial<CreateSong>) {
  return await prisma.song.update({ 
    where: { id }, 
    data: {
      ...data,
      updated_at: new Date()
    } 
  });
}

/*
  Delete a song by ID
 */
export async function deleteSong(id: string) {
  // First delete all event associations
  await prisma.eventSong.deleteMany({
    where: { songId: id }
  })
  return await prisma.song.delete({ where: { id } });
}
