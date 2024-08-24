import React from 'react';
import Link from "next/link";
import {SignedIn, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-white shadow-sm p-5 border-b">
            <Link href="/dashboard">
                Chat to <span className="text-teal-600 font-extrabold">PDF</span>
            </Link>

            <SignedIn>
                <nav className="flex items-center space-x-2">

                    <Button asChild variant="link" className="hidden md:flex">
                        <Link href="/dashboard/upgrade">Pricing</Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/dashboard">My Documents</Link>
                    </Button>

                    <Button asChild variant="outline" className="border-teal-600">
                        <Link href="/dashboard/upload">
                            <FilePlus2 className="text-teal-600" />
                        </Link>
                    </Button>

                    <UserButton />
                </nav>
            </SignedIn>
        </div>
    );
};

export default Header;