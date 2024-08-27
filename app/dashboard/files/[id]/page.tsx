import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {adminDb} from "@/firebaseAdmin";
import PdfView from "@/components/PdfView";

async function ChatToFilePage({params: { id }}: {params: { id: string }}) {
    auth().protect(); // Protect route with Clerk
    const { userId } = await auth();

    const ref = await adminDb
            .collection("users")
            .doc(userId!)
            .collection("files")
            .doc(id)
            .get();

    const url = ref.data()?.downloadUrl;

    return <div className="grid lg:grid-cols-5 h-full overflow-hidden">

        {/* Document */}
        <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-teal-600 lg:-order-1 overflow-auto">

        </div>

        {/* Chat */}
        <div className="col-span-5 lg:col-span-2 overflow-y-auto">

        </div>

    </div>
    ;
}

export default ChatToFilePage;