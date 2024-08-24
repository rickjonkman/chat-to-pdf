"use client";

import {useRouter} from "next/router";
import {useTransition} from "react";
import {Button} from "@/components/ui/button";
import { DownloadCloud, Trash2Icon } from "lucide-react";

type DocumentProps = {
    id: string;
    name: string;
    size: number;
    downloadUrl: string;
}

const Document = ({ id, name, downloadUrl }: DocumentProps) => {

    const router = useRouter();
    const [isDeleting, startTransaction] = useTransition();

    return (
        <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:bg-teal-600 hover:text-white cursor-pointer group">

            <div
                className="flex-1"
                onClick={() => router.push(`/dashboard/files/${id}`)}
            >
                <p className="font-semibold line-clamp-2">{name}</p>
                // TODO: byte-size
            </div>

            <div className="flex space-x-2 justify-end">
                <Button variant="outline">
                    <Trash2Icon className="h-6 w-6 text-red-600" />
                </Button>

                <Button variant="outline" asChild>
                    <a href={downloadUrl} download>
                        <DownloadCloud className="h-6 w-6 text-indigo-600" />
                    </a>
                </Button>
            </div>


        </div>
    );
};

export default Document;