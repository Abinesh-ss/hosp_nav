import Link from 'next/link';
import { LayoutDashboard, Globe, Map } from 'lucide-react';

export default function HomePage() {
return (
<main className="min-h-[calc(100vh-64px)] bg-background">
    <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Side: Hero Text & CTA (Design confidently. style) */}
            <div className="space-y-8">
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
                    Design <span className="text-primary">confidently.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                    HospiNav is the remote map research platform that takes the guesswork out of indoor navigation by validating them with real users.
                </p>
                <Link href="/upload" className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors h-12 px-8 py-3 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                    Get Started
                </Link>
            </div>

            {/* Right Side: Illustration (Matching the image style) */}
            <div className="flex h-96 items-center justify-center">
                <div className="w-full h-full bg-secondary/50 rounded-xl flex items-center justify-center p-4 shadow-xl">
                    <p className="text-lg text-secondary-foreground/80">
                        [Map Builder Illustration Placeholder]
                    </p>
                </div>
            </div>
        </div>

        {/* Client Logos (The world's best companies rely on...) */}
        <div className="mt-20 pt-10 border-t border-border">
            <p className="text-center text-sm font-semibold uppercase text-muted-foreground mb-8">
                The world's best hospitals rely on HospiNav to make better visitor experience decisions.
            </p>
            <div className="flex justify-center flex-wrap gap-x-12 gap-y-6">
                <span className="text-2xl font-bold text-gray-400">AMAZON</span>
                <span className="text-2xl font-bold text-gray-400">Google</span>
                <span className="text-2xl font-bold text-gray-400">Airtable</span>
                <span className="text-2xl font-bold text-gray-400">asana</span>
                <span className="text-2xl font-bold text-gray-400">box</span>
            </div>
        </div>
    </div>
</main>
);
}
