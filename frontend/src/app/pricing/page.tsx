import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
{ 
    name: "Startup", 
    price: "$14", 
    unit: "/user, per month", 
    features: ["5 Map Profiles", "15-day Trial", "400+ Templates", "Calendar View", "24/7 Support"], 
    isPrimary: false 
},
{ 
    name: "Business", 
    price: "$29", 
    unit: "/user, per month", 
    features: ["10 Map Profiles", "Unlimited Team Members", "Advanced Analytics", "Real-time Tracking", "Priority Support"], 
    isPrimary: true 
},
{ 
    name: "Agency", 
    price: "$139", 
    unit: "/user, per month", 
    features: ["100 Map Profiles", "White-label Solution", "Dedicated Infrastructure", "SLA Guarantee", "24/7 Phone Support"], 
    isPrimary: false 
},
];

export default function PricingPage() {
return (
<section className="container py-20">
    <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Manage All Your <span className="text-purple-600">Map Profiles</span> From One Place.
        </h2>
        <div className="mt-8 flex justify-center space-x-8 text-lg font-medium text-gray-700">
            <p className="flex items-center"><Check className="h-5 w-5 mr-2 text-green-500" /> Free 15-day trial</p>
            <p className="flex items-center"><Check className="h-5 w-5 mr-2 text-green-500" /> Unlimited Team Members</p>
            <p className="flex items-center"><Check className="h-5 w-5 mr-2 text-green-500" /> Cancel Anytime</p>
        </div>
    </div>

    {/* Billing Toggle (mocked) */}
    <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-full text-sm font-medium">
            <span className="py-2 px-6 rounded-full bg-white shadow-md text-primary">Billed Yearly</span>
            <span className="py-2 px-6 text-muted-foreground">Billed Monthly</span>
        </div>
    </div>

    <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {pricingPlans.map(p => (
            <div
                key={p.name}
                className={`flex flex-col rounded-xl border p-8 shadow-lg transition-all duration-300 ${p.isPrimary ? 'border-primary bg-gray-900 text-white shadow-2xl scale-[1.02]' : 'bg-card border-gray-200'}`}
            >
                <h3 className="text-3xl font-bold mb-6">{p.name}</h3>
                <p className="mb-8">
                    <span className={`text-6xl font-extrabold ${p.isPrimary ? 'text-white' : 'text-foreground'}`}>{p.price}</span>
                    <span className={`text-lg font-medium ${p.isPrimary ? 'text-gray-400' : 'text-muted-foreground'}`}>{p.unit}</span>
                </p>

                <Link
                    href="/login"
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors w-full border ${p.isPrimary
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary/50'
                        : 'bg-white text-primary hover:bg-gray-50 border-primary'}`}
                >
                    Start My 15-day Trial
                </Link>
                
                <ul className="flex-grow space-y-3 mt-8 pt-6 border-t border-dashed" style={{ borderColor: p.isPrimary ? 'rgb(55 65 81)' : 'rgb(229 231 235)' }}>
                    {p.features.map((feature, index) => (
                        <li key={index} className={`flex items-center ${p.isPrimary ? 'text-gray-300' : 'text-muted-foreground'}`}>
                            <Check className={`h-5 w-5 mr-2 ${p.isPrimary ? 'text-green-400' : 'text-primary'}`} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
</section>
);
}
