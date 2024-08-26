import {ChatOpenAI} from "@langchain/openai";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {OpenAIEmbeddings} from "@langchain/openai";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {createRetrievalChain} from "langchain/chains/retrieval";
import {createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever";
import {HumanMessage, AIMessage} from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {PineconeConflictError} from "@pinecone-database/pinecone/dist/errors";
import {Index, RecordMetadata} from "@pinecone-database/pinecone";
import {adminDb} from "@/firebaseAdmin";
import {auth} from "@clerk/nextjs/server";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4o",
})

export const indexName = "rixdev";

export async function generateDocs(docId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    console.log("=== Loading Fetching download URL from Firebase ===");
    const firebaseRef = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .doc(docId)
        .get();

    const downloadUrl = firebaseRef.data()?.downloadUrl;

    if (!downloadUrl) {
        throw new Error("Download URL not found");
    }

    console.log((`=== Loading PDF from ${downloadUrl} ===`));

    const response = await fetch(downloadUrl);

    const data = await response.blob();

    console.log("=== Loading PDF Document ===");
    const loader = new PDFLoader(data);
    const docs = await loader.load();

    console.log("=== Splitting Document ===");
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);
    console.log(`=== Split into ${splitDocs.length} documents ===`);

    return splitDocs;
}

async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
    if (namespace === null) throw new Error("Namespace is null");

    const { namespaces } = await index.describeIndexStats();
    return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsPineconeVectorStore(docId: string) {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    let pineconeVectorStore;

    // Generate embeddings for the split documents
    console.log("=== Generating embeddings ===");
    const embeddings = new OpenAIEmbeddings();

    const index = await pineconeClient.index(indexName);
    const namespaceAlreadyExists = await namespaceExists(index, docId);

    if (!namespaceAlreadyExists) {
        console.log(`=== Namespace ${docId} already exists, reusing existing embeddings... ===`);

        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: docId,
        })

        return pineconeVectorStore;
    } else {
        console.log(`=== Namespace ${docId} does not exist, generating embeddings... ===`);

        const splitDocs = await generateDocs(docId);

        console.log(`=== Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store. ===`);

        pineconeVectorStore = await PineconeStore.fromDocuments(
            splitDocs,
            embeddings,
            {
                pineconeIndex: index,
                namespace: docId,
            }
        );

        return pineconeVectorStore;
    }

}