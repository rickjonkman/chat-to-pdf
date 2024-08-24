import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {adminDb} from "@/firebaseAdmin";
import PlaceholderDocument from "@/components/PlaceholderDocument";

const Documents = async () => {
    auth().protect();

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    const documentsSnapshot = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .get();

    return (
        <div className="flex flex-wrap justify-center items-center p-5 bg-gray-100 lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
            <PlaceholderDocument />
        </div>

    );
};

export default Documents;