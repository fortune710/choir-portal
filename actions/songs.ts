'use server'

import { revalidatePath } from "next/cache";
import { addSong } from "@/services/songsService"; // You'll need to create this service
import {
  deleteSong as deleteSongDb,
  updateSong as updateSongDb
} from "@/services/songsService"
import { put } from '@vercel/blob';

export async function createSong(formData: FormData) {
  try {
    const songName = formData.get("name")?.toString() ?? "";
    const youtubeLink = formData.get("youtubeLink")?.toString() ?? "";
    const artist = formData.get("artist")?.toString() ?? "";
    const mp3File = formData.get("mp3") as File | null;
    const songKey = formData.get("song_key")?.toString() ?? null;
    const songLyrics = formData.get("song_lyrics")?.toString() ?? null;

    let mp3Url = "";
    if (mp3File && mp3File.size > 0) {
      // Upload the file to Vercel Blob storage
      const blob = await put(`songs/${mp3File.name}`, mp3File, {
        access: 'public',
        addRandomSuffix: true,
      });
      mp3Url = blob.url;
    }

    await addSong({
      title: songName,
      link: youtubeLink,
      artist: artist,
      mp3_url: mp3Url,
      key: songKey,
      lyrics: songLyrics,
    });

    //Refetch songs
    revalidatePath('/songs');
    return { success: true };
  } catch (error) {
    console.error('Error creating song:', error);
    return { success: false, error: 'Failed to create song' };
  }
}

interface UpdateSongData {
  title: string
  artist: string
  link: string | null
  mp3_url: string | null
}

export async function updateSong(songId: string, data: UpdateSongData) {
  try {
    // Validate inputs
    if (!songId || !data.title || !data.artist) {
      return {
        success: false,
        error: "Song ID, title, and artist are required"
      }
    }

    await updateSongDb(songId, data)
    revalidatePath('/songs')
    return { success: true }
  } catch (error) {
    console.error('Error updating song:', error)
    return {
      success: false,
      error: 'Failed to update song'
    }
  }
}

export async function deleteSong(songId: string) {
  try {
    if (!songId) {
      return {
        success: false,
        error: "Song ID is required"
      }
    }

    await deleteSongDb(songId)
    revalidatePath('/songs')
    return { success: true }
  } catch (error) {
    console.error('Error deleting song:', error)
    return {
      success: false,
      error: 'Failed to delete song'
    }
  }
}