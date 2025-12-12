import { Plus, Link as LinkIcon, Save, Trash2 } from 'lucide-react';

export default function EditorPage() {
return (
<section className="container py-12 min-h-[calc(100vh-64px)]">
<h2 className="text-3xl font-bold tracking-tight mb-8 text-gray-800">Map Editor & Graph Builder 🗺️</h2>

<div className="grid h-[80vh] gap-6 lg:grid-cols-4">
    {/* Editor Tools (1/4 width) */}
    <div className="rounded-xl border bg-card p-6 shadow-lg lg:col-span-1 flex flex-col space-y-6">
        <h3 className="text-xl font-semibold border-b pb-3 mb-3 text-primary">Map Tools</h3>
        
        {/* Tool Buttons */}
        <div className="space-y-3">
            <button className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4 mr-2" /> Add Point of Interest (POI)
            </button>
            <button className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-teal-500 text-white hover:bg-teal-600 transition-colors">
                <LinkIcon className="h-4 w-4 mr-2" /> Connect Nodes (Path)
            </button>
            <button className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
            </button>
        </div>

        {/* POI List / Settings Placeholder */}
        <div className="flex-grow p-4 border rounded-lg bg-gray-50 overflow-y-auto">
            <p className="text-sm font-semibold mb-2">POI List (0)</p>
            <p className="text-xs text-muted-foreground">Click a node to edit its properties (Name, Type, Floor).</p>
        </div>

        <button className="w-full inline-flex items-center justify-center rounded-lg text-base font-medium h-12 px-4 py-2 bg-green-600 text-white hover:bg-green-700 shadow-md">
            <Save className="h-5 w-5 mr-2" /> Finalize & Save Map
        </button>
    </div>

    {/* Map Canvas (3/4 width) */}
    <div className="rounded-xl border-4 border-primary/50 bg-secondary/20 p-4 shadow-xl lg:col-span-3 flex items-center justify-center">
        <p className="text-2xl font-medium text-primary/80">Interactive Map Canvas (Graph Visualization)</p>
    </div>
</div>
</section>
);
}
