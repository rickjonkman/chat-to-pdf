"use server";

import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";
import {generateEmbeddingsPineconeVectorStore} from "@/lib/langchain";

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect route with Clerk

    // Turn PDF into embeddings
    await generateEmbeddingsPineconeVectorStore(docId);

    revalidatePath('/dashboard');

    return {completed: true};
}