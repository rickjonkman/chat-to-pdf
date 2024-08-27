"use client";
import React, {useCallback, useEffect} from 'react';
import {useDropzone} from "react-dropzone";
import {CheckCircleIcon, CircleArrowDown, HammerIcon, RocketIcon, SaveIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import useUpload, {StatusText} from "@/hooks/useUpload";
import {useToast} from "./ui/use-toast";

const FileUploader = () => {

    const {progress, status, fileId, handleUpload} = useUpload();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (fileId) {
            router.push(`/dashboard/files/${fileId}`);
        }
    }, [fileId, router]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            await handleUpload(file);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No file found",
            })
        }
    }, []);

    const statusIcons: {
        [key in StatusText]: JSX.Element;
    } = {
        [StatusText.UPLOADING]: (
            <RocketIcon className="h-20 w-20 text-teal-600" />
        ),
        [StatusText.UPLOADED]: (
            <CheckCircleIcon className="h-20 w-20 text-teal-600" />
        ),
        [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-teal-600" />,
        [StatusText.GENERATING]: (
            <HammerIcon className="h-20 w-20 text-teal-600 animate-bounce" />
        ),
    };

    const {getRootProps, getInputProps, isDragActive, isFocused, isDragAccept} =
        useDropzone({
            onDrop,
            maxFiles: 1,
            accept: {
                "application/pdf": ["pdf"],
            }
        });

    const uploadInProgress = progress != null && progress >= 0 && progress <= 100;
    const statusDisplay = status != null && status.toString().length > 0;

    return (
        <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">

            {/*TODO: Loading Spinner*/}
            {
                uploadInProgress && (
                    <div className="mt-32 flex flex-col justify-center items-center gap-5">
                        <div className={`radial-progress bg-teal-300 text-white border-teal-600 border-4 ${
                            progress === 100 && "hidden"
                        }`}
                             role="progressbar"
                             style={{
                                 // @ts-ignore
                                 "--value": progress,
                                 "--size": "12rem",
                                 "--thickness": "1.3rem",
                             }}
                        >
                            {progress} %
                        </div>

                        {
                            // @ts-ignore
                            statusIcons[status!]
                        }

                        <p>
                            {statusDisplay}
                        </p>
                    </div>
                )
            }

            {!uploadInProgress && (<div {...getRootProps()}
                  className={`p-10 border-2 border-dashed mt-10 w-[90%] border-teal-600 text-teal-600 rounded-lg h-96 flex items-center justify-center ${isFocused || isDragAccept ? 'bg-teal-300' : 'bg-teal-50'}`}
            >
                <>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-between">
                        {
                            isDragActive ?
                                (
                                    <>
                                        <RocketIcon className="h-20 w-20 animate-ping"/>
                                        <p>Drop the files here ...</p>
                                    </>
                                ) : (
                                    <>
                                        <CircleArrowDown className="h-20 w-20 animate-bounce"/>
                                        <p>Drag & drop some files here, or click to select files</p>
                                    </>
                                )
                        }
                    </div>
                </>
            </div>)}
        </div>
    );
};

export default FileUploader;