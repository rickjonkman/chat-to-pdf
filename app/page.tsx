import {
    ShieldCheckIcon,
    ZapIcon,
    MessageCircleIcon,
    FileTextIcon,
    ServerCogIcon,
    MonitorSmartphoneIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
        name: "Store your PDF Documents",
        description: "Upload your PDF documents and store them in a secure location.",
        icon: ShieldCheckIcon,
    },
    {
        name: "Super Fast Responses",
        description: "Experience lightning-fast answers to your queries, ensuring uou get the information you need instantly.",
        icon: ZapIcon,
    },
    {
        name: "Chat Memorization",
        description: "The intelligent chatbot remembers previous interactions, providing a seamless and personalized experience.",
        icon: MessageCircleIcon,
    },
    {
        name: "Interactive PDF Viewer",
        description: "Engage with your PDFs like never before using our intuitive and interactive PDF viewer.",
        icon: FileTextIcon,
    },
    {
        name: "Cloud Backup",
        description: "Never lose your documents again with our secure cloud backup service.",
        icon: ServerCogIcon,
    },
    {
        name: "Cross-Platform Support",
        description: "Access your documents from any device, anywhere in the world.",
        icon: MonitorSmartphoneIcon,
    }
]

export default function Home() {
    return (
        <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-teal-500">
            <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
                <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-base font-semibold leading-7 text-teal-600">Your Digital Document
                            Manager</h2>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">Turn static
                            PDFs into interactive dialogs</h1>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Introducing{" "}
                            <span className="font-bold text-teal-600">Chat to PDF</span>
                            <br/>
                            <br/> Upload your document, and our chatbot will answer
                            questions, summarize content, and answer all your Qs. Ideal for
                            everyone, <span className="text-teal-600">
                Chat with PDF
              </span>{" "}
                            turns static documents into{" "}
                            <span className="font-bold">dynamic conversations</span>,
                            enhancing productivity 10x fold effortlessly.
                        </p>
                    </div>

                    <Button asChild className="mt-10">
                        <Link href="/dashboard">Get started</Link>
                    </Button>
                </div>

                <div className="mt-16 max-w-7xl px-6 flex justify-between mx-auto sm:mt-20 md:mt-24 lg:px-8">
                    <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                        {
                            features.map((feature) => (
                                <div key={feature.name} className="relative pl-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-teal-600" />
                                    </dt>
                                    <dd className="font-bold">{feature.name}</dd>
                                    <dd>{feature.description}</dd>
                                </div>
                            ))
                        }
                    </dl>
                </div>

            </div>
        </main>
    );
}
