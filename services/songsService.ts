import prisma from "@/lib/prisma";

/*
  Get all songs
 */
export async function getSongs() {
  return await prisma.song.findMany();
}

/*
  Add a new song with YouTube & MP3 links
 */
export async function addSong(data: { title: string; artist: string; link?: string; mp3_url?: string }) {
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
export async function updateSong(id: string, data: { title?: string; artist?: string; link?: string; mp3_url?: string }) {
  return await prisma.song.update({ where: { id }, data });
}

/*
  Delete a song by ID
 */
export async function deleteSong(id: string) {
  return await prisma.song.delete({ where: { id } });
}
