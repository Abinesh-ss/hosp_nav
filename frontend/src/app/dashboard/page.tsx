import { Plus, Users, Briefcase, DollarSign, Car, Settings, Map, History } from 'lucide-react';
import Link from 'next/link';

const mockUser = { name: "Emma Kwan", role: "Admin" };
const mockStats = [
    { label: "Total Patients", value: "3,256", icon: Users, color: 'text-purple-600' },
    { label: "Available Staff", value: "394", icon: Briefcase, color: 'text-blue-500' },
    { label: "Avg. Treat. Costs", value: "$2,536", icon: DollarSign, color: 'text-orange-500' },
    { label: "Available Cars", value: "38", icon: Car, color: 'text-red-500' },
];

const SidebarItem = ({ icon: Icon, label, href, active }) => (
    <Link href={href} className={`flex items-center p-3 rounded-lg transition-colors ${active ? 'bg-indigo-50 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
        <Icon className="h-5 w-5 mr-3" />
        {label}
    </Link>
);

export default function DashboardPage() {
    const user = mockUser;

    return (
        <section className="flex min-h-[calc(100vh-64px)] bg-gray-50">
            
            {/* Sidebar (Left Panel) - Fixed width w-64 and p-6 padding */}
            <div className="w-64 p-6 bg-white border-r min-h-[calc(100vh-64px)] flex flex-col">
                <div className="text-2xl font-bold text-primary mb-10">HOSPI<span className="text-purple-600">NAV</span></div>
                
                <button className="flex items-center justify-center w-full bg-primary text-white p-3 rounded-xl mb-8 hover:bg-primary/90 transition-colors shadow-primary-lg">
                    <Plus className="h-5 w-5 mr-2" /> Register patient
                </button>

                <nav className="space-y-1">
                    <SidebarItem icon={Users} label="Patients" href="/dashboard" active={false} />
                    <SidebarItem icon={Map} label="Overview" href="/dashboard" active={true} />
                    <SidebarItem icon={Map} label="Map" href="/dashboard" active={false} />
                    <SidebarItem icon={Map} label="Departments" href="/dashboard" active={false} />
                    <SidebarItem icon={Map} label="Doctors" href="/dashboard" active={false} />
                    <SidebarItem icon={History} label="History" href="/dashboard" active={false} />
                </nav>
                
                <div className="mt-auto pt-6 border-t border-gray-100"> {/* Push settings and mobile app to the bottom */}
                    <SidebarItem icon={Settings} label="Settings" href="/dashboard" active={false} />
                     {/* Mobile App CTA */}
                    <div className="p-4 mt-6 rounded-xl bg-purple-700-custom text-white">
                        <p className="text-sm font-semibold mb-2">Get mobile app</p>
                        <div className="flex gap-2 text-xs">
                            <span className="opacity-80">Android</span>
                            <span className="opacity-80">Apple</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Correct p-8 padding and overflow-y-auto */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header/Search Bar */}
                <header className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-96 pl-10 pr-4 py-2 border rounded-full focus:border-primary focus:ring-1 focus:ring-primary/50" 
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-700">Hi, {user.name}</div>
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">E</div>
                    </div>
                </header>

                {/* Metric Cards - grid gap-6 for proper card spacing */}
                <div className="grid gap-6 md:grid-cols-4 mb-8">
                    {mockStats.map(stat => (
                        <div key={stat.label} className="rounded-xl bg-white p-6 shadow-md border">
                            <div className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
                            <h3 className="text-sm font-medium text-gray-500 mt-1">{stat.label}</h3>
                        </div>
                    ))}
                </div>

                {/* Charts and Data Grids - grid gap-6 for vertical and horizontal spacing */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Chart: Outpatients vs. Inpatients Trend */}
                    <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-md border h-96 flex flex-col">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                             <h3 className="text-lg font-semibold">Outpatients vs. Inpatients Trend</h3>
                             <p className="text-sm text-muted-foreground">Show by months</p>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                             <p className="text-muted-foreground">Chart Placeholder</p>
                        </div>
                    </div>

                    {/* Right Panel: Patients by Gender & Division */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="rounded-xl bg-white p-6 shadow-md border h-48 flex items-center justify-center">
                             <p className="text-muted-foreground">Patients by Gender Chart Placeholder</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-md border h-48 flex items-center justify-center">
                            <p className="text-muted-foreground">Time Admitted Chart Placeholder</p>
                        </div>
                    </div>
                    
                    {/* Bottom Panel: Division & Patient Count */}
                     <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-md border h-72 flex items-center justify-center">
                        <p className="text-muted-foreground">Patients By Division Placeholder</p>
                    </div>
                    
                    {/* Bottom Right: Purple Card */}
                    <div className="lg:col-span-1 rounded-xl p-6 shadow-md h-72 flex flex-col items-center justify-center text-white bg-purple-700-custom">
                        <p className="font-bold text-3xl mb-1">3,240</p>
                        <p className="text-lg">Patients this month</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
