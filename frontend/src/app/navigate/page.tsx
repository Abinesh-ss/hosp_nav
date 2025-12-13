// app/navigate/page.tsx
import { MapPin, Navigation2, Clock } from 'lucide-react';

export default function NavigatePage() {
  return (
    <section className="py-8 min-h-[calc(100vh-120px)] page-transition">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-gray-800 flex items-center">
          <Navigation2 className="h-8 w-8 mr-3 text-primary" /> Live Navigation
        </h2>

        <div className="rounded-2xl border-4 border-primary/50 bg-secondary-10 p-6 shadow-2xl h-[75vh] flex flex-col overflow-hidden">
          {/* Navigation Header/Instructions */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-primary mb-1">Path: Room 101 to Emergency Exit</h3>
              <p className="text-sm text-muted-foreground">Current Step: Turn right at the main desk.</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600 flex items-center">
                <Clock className="h-6 w-6 mr-2" /> 3 min
              </span>
              <span className="text-sm font-medium text-gray-500">150m total</span>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-grow flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-inner">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-red-500 animate-pulse" />
              <p className="text-2xl font-medium text-muted-foreground">Live A* Pathfinding Visualization Map View</p>
              <p className="text-sm text-gray-400 mt-2">Your current location is actively being tracked.</p>
            </div>
          </div>

          {/* Status/Controls Footer */}
          <div className="mt-4 flex justify-between p-4 bg-white rounded-xl shadow-inner border border-gray-200">
            <span className="font-medium text-green-700 flex items-center">Current Status: <span className="font-bold ml-2">Tracking Position</span></span>
            <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-1 px-3 rounded-md border border-red-300 hover:bg-red-50">
              End Navigation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

