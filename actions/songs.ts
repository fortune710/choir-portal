'use server'

import { revalidatePath } from "next/cache";
import { addSong } from "@/services/songsService"; // You'll need to create this service


export async function createSong(formData: FormData) {
    try {
        const songName = formData.get("name")?.toString() ?? "";
        const youtubeLink = formData.get("youtubeLink")?.toString() ?? "";
        const artist = formData.get("artist")?.toString() ?? "";
        const mp3File = formData.get("mp3") as File | null;

        let mp3Url = "";
        if (mp3File && mp3File.size > 0) {
            // Process the MP3 file here
            // You'll need to implement file upload logic
            // mp3Url = await uploadMP3(mp3File);
        }

        await addSong({
            title: songName,
            link: youtubeLink,
            artist: artist,
            mp3_url: mp3Url,
        });

        //Refetch songs
        revalidatePath('/songs');
        return { success: true };
    } catch (error) {
        console.error('Error creating song:', error);
        return { success: false, error: 'Failed to create song' };
    }
}

