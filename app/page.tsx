import {
    ShieldCheckIcon,
    ZapIcon,
    MessageCircleIcon,
    FileTextIcon,
    ServerCogIcon,
    MonitorSmartphoneIcon
} from "lucide-react";

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
                        <h2 className="text-base font-semibold leading-7 text-teal-600">Your Digital Document Manager</h2>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">Turn static PDFs into interactive dialogs</h1>

                        <p>

                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
