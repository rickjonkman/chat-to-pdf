"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {PlusCircleIcon} from "lucide-react";
import {useRouter} from "next/navigation";


const PlaceholderDocument = () => {
    const router = useRouter();

    const handleClick = () => {
        //TODO: Check for user's plan and upload-limit
        router.push("/dashboard/upload");
    }

    return (
        <Button
            className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
            onClick={handleClick}
        >
            <PlusCircleIcon className="h-16 w-16" />
            Placeholder Document
        </Button>
    );
};

export default PlaceholderDocument;