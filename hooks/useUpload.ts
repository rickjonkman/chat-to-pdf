"use client";

import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from 'uuid';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {db, storage} from "@/firebase";
import {doc, setDoc} from "@firebase/firestore";

const enum StatusText {
    UPLOADING = "Uploading file...",
    UPLOADED = "File uploaded successfully",
    SAVING = "Saving file...",
    GENERATING = "Generating embeddings...",
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const {user} = useUser();
    const router = useRouter();

    const handleUpload = async (file: File) => {
        if (!file || !user) return;

        //TODO: FREE or PRO limitations

        const fileIdToUploadTo = uuidv4();

        const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setStatus(StatusText.UPLOADING);
            setProgress(percent);
        }, (error) => {
            console.error("Error uploading file", error);
        }, async () => {
            setStatus(StatusText.UPLOADED);
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            setStatus(StatusText.SAVING);
            await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
                name: file.name,
                size: file.size,
                downloadUrl: downloadURL,
                createdAt: new Date().toISOString(),
            })

            setStatus(StatusText.GENERATING);
            setFileId(fileIdToUploadTo);
        });
    }

    return { progress, status, fileId, handleUpload };
}

export default useUpload;