"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { 
  MapPin, 
  Navigation, 
  Save, 
  Plus, 
  Trash2, 
  Eye, 
  Settings,
  MousePointer,
  Building,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Editor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [activeTool, setActiveTool] = useState('pointer');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);
    
    // Initialize with sample data
    setSelectedMap({
      id: 1,
      name: "Main Hospital Floor - Level 1",
      uploadDate: "2024-01-15",
      status: "ready"
    });
    
    setPointsOfInterest([
      { id: 1, name: "Main Entrance", type: "entrance", x: 100, y: 100 },
      { id: 2, name: "Reception", type: "service", x: 200, y: 150 },
      { id: 3, name: "Emergency Room", type: "medical", x: 350, y: 200 },
      { id: 4, name: "Radiology", type: "medical", x: 400, y: 300 },
      { id: 5, name: "Pharmacy", type: "service", x: 250, y: 350 },
    ]);
    
    setRoutes([
      { id: 1, from: 1, to: 2, distance: 15 },
      { id: 2, from: 2, to: 3, distance: 25 },
      { id: 3, from: 2, to: 4, distance: 35 },
      { id: 4, from: 2, to: 5, distance: 20 },
    ]);
  }, []);

  const handleToolChange = (tool) => {
    setActiveTool(tool);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Map saved successfully!');
  };

  const addPointOfInterest = () => {
    const newPOI = {
      id: Date.now(),
      name: `Point ${pointsOfInterest.length + 1}`,
      type: 'general',
      x: Math.floor(Math.random() * 500) + 50,
      y: Math.floor(Math.random() * 400) + 50
    };
    setPointsOfInterest(prev => [...prev, newPOI]);
  };

  const deletePointOfInterest = (id) => {
    setPointsOfInterest(prev => prev.filter(poi => poi.id !== id));
    setRoutes(prev => prev.filter(route => route.from !== id && route.to !== id));
  };

  const availableMaps = [
    { id: 1, name: "Main Hospital Floor - Level 1", status: "ready" },
    { id: 2, name: "Emergency Wing Layout", status: "processing" },
    { id: 3, name: "Outpatient Department", status: "ready" },
  ];

  const poiTypes = [
    { value: 'entrance', label: 'Entrance', color: 'bg-green-500' },
    { value: 'exit', label: 'Exit', color: 'bg-red-500' },
    { value: 'medical', label: 'Medical', color: 'bg-blue-500' },
    { value: 'service', label: 'Service', color: 'bg-orange-500' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-600' },
    { value: 'general', label: 'General', color: 'bg-gray-500' },
  ];

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Layout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Map Editor</h1>
            <p className="text-gray-600 mt-1">
              {selectedMap ? `Editing: ${selectedMap.name}` : 'Select a map to edit'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => alert('Preview functionality coming soon!')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Map
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Map Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Map</h3>
              <div className="space-y-2">
                {availableMaps.map((map) => (
                  <button
                    key={map.id}
                    onClick={() => setSelectedMap(map)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedMap?.id === map.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{map.name}</span>
                      {map.status === 'ready' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleToolChange('pointer')}
                  className={`p-3 rounded-lg border transition flex flex-col items-center ${
                    activeTool === 'pointer'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <MousePointer className="w-5 h-5 mb-1" />
                  <span className="text-xs">Select</span>
                </button>
                <button
                  onClick={() => handleToolChange('poi')}
                  className={`p-3 rounded-lg border transition flex flex-col items-center ${
                    activeTool === 'poi'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add POI</span>
                </button>
                <button
                  onClick={() => handleToolChange('route')}
                  className={`p-3 rounded-lg border transition flex flex-col items-center ${
                    activeTool === 'route'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ArrowRight className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add ArrowRight</span>
                </button>
                <button
                  onClick={() => handleToolChange('building')}
                  className={`p-3 rounded-lg border transition flex flex-col items-center ${
                    activeTool === 'building'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Building className="w-5 h-5 mb-1" />
                  <span className="text-xs">Area</span>
                </button>
              </div>
            </div>

            {/* Points of Interest */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Points of Interest</h3>
                <button
                  onClick={addPointOfInterest}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <Plus className="w-4 h-4 text-indigo-600" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pointsOfInterest.map((poi) => {
                  const poiType = poiTypes.find(t => t.value === poi.type);
                  return (
                    <div key={poi.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${poiType?.color || 'bg-gray-500'} mr-2`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{poi.name}</div>
                          <div className="text-xs text-gray-500">({poi.x}, {poi.y})</div>
                        </div>
                      </div>
                      <button
                        onClick={() => deletePointOfInterest(poi.id)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Map Canvas</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Tool:</span>
                  <span className="font-medium text-gray-700 capitalize">{activeTool}</span>
                </div>
              </div>
              
              {/* Canvas */}
              <div className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 h-[600px] overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Map Background (placeholder) */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Map Background</p>
                    <p className="text-sm text-gray-400">Your floor plan would appear here</p>
                  </div>
                </div>

                {/* Points of Interest */}
                {pointsOfInterest.map((poi) => {
                  const poiType = poiTypes.find(t => t.value === poi.type);
                  return (
                    <div
                      key={poi.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition"
                      style={{ left: poi.x, top: poi.y }}
                    >
                      <div className={`w-8 h-8 rounded-full ${poiType?.color || 'bg-gray-500'} flex items-center justify-center shadow-lg`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {poi.name}
                      </div>
                    </div>
                  );
                })}

                {/* Routes */}
                <svg className="absolute inset-0 pointer-events-none">
                  {routes.map((route) => {
                    const fromPOI = pointsOfInterest.find(p => p.id === route.from);
                    const toPOI = pointsOfInterest.find(p => p.id === route.to);
                    if (!fromPOI || !toPOI) return null;
                    
                    return (
                      <g key={route.id}>
                        <line
                          x1={fromPOI.x}
                          y1={fromPOI.y}
                          x2={toPOI.x}
                          y2={toPOI.y}
                          stroke="#4f46e5"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          opacity="0.6"
                        />
                        <circle
                          cx={(fromPOI.x + toPOI.x) / 2}
                          cy={(fromPOI.y + toPOI.y) / 2}
                          r="12"
                          fill="white"
                          stroke="#4f46e5"
                          strokeWidth="2"
                        />
                        <text
                          x={(fromPOI.x + toPOI.x) / 2}
                          y={(fromPOI.y + toPOI.y) / 2 + 4}
                          textAnchor="middle"
                          className="text-xs font-medium fill-indigo-600"
                        >
                          {route.distance}m
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Toolbar Overlay */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                  <div className="flex items-center space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded transition">
                      <Settings className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition">
                      <Navigation className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>POIs: {pointsOfInterest.length}</span>
                  <span>Routes: {routes.length}</span>
                  <span>Total Distance: {routes.reduce((sum, route) => sum + route.distance, 0)}m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
