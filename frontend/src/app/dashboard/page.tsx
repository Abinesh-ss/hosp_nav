// app/dashboard/page.tsx
import { Plus, Users, Briefcase, DollarSign, Car, Settings, Map, History, LucideIcon, Search, Bell } from 'lucide-react';
import Link from 'next/link';

const mockUser = { name: "Emma Kwan", role: "Admin" };
const mockStats = [
  { label: "Total Patients", value: "3,256", icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: "Available Staff", value: "394", icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: "Avg. Treat. Costs", value: "$2,536", icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: "Available Cars", value: "38", icon: Car, color: 'text-red-600', bg: 'bg-red-50' },
];

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => (
  <Link href={href} className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-semibold' : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
    <Icon className={`h-5 w-5 mr-3 ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
    {label}
  </Link>
);

export default function DashboardPage() {
  return (
    // Full width section (no content-wrap) so sidebar can be flush left
    <section className="min-h-[calc(100vh-100px)] bg-[#f8fafc] page-transition">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 p-8 bg-white border-r border-slate-100 hidden lg:block">
          <button className="flex items-center justify-center w-full bg-indigo-600 text-white p-4 rounded-2xl mb-10 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            <Plus className="h-5 w-5 mr-2" /> Register patient
          </button>

          <nav className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-3">Menu</p>
            <SidebarItem icon={Users} label="Patients" href="/dashboard" active={false} />
            <SidebarItem icon={Map} label="Overview" href="/dashboard" active={true} />
            <SidebarItem icon={Map} label="Map Builder" href="/editor" active={false} />
            <SidebarItem icon={History} label="History" href="/dashboard" active={false} />
          </nav>

          <div className="mt-12 pt-8 border-t border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-3">Account</p>
            <SidebarItem icon={Settings} label="Settings" href="/dashboard" active={false} />
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3 pl-6 border-l border-slate-100">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">{mockUser.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{mockUser.role}</div>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">E</div>
              </div>
            </div>
          </header>

          {/* Metric Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            {mockStats.map(stat => (
              <div key={stat.label} className="group rounded-3xl bg-white p-6 shadow-sm border border-slate-50 hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <h3 className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{stat.label}</h3>
              </div>
            ))}
          </div>

          {/* Charts + Status */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-slate-50 h-96 flex flex-col items-center justify-center border-dashed">
              <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-indigo-200" />
              </div>
              <p className="text-slate-400 font-medium">Activity analytics will appear here</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-2">Hospital Map Status</h4>
                <p className="text-indigo-100 text-sm opacity-80 font-medium leading-relaxed">Your floor plans are currently being processed for navigation paths.</p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                  <span>Optimization</span>
                  <span>84%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[84%]"></div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </section>
  );
}

