"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Navigation,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Mic,
  ChevronsUpDown,
  AlertCircle,
  CheckCircle,
  Users,
  Accessibility,
  MoveVertical,
} from "lucide-react";

export default function Navigate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [destination, setDestination] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);

    setCurrentLocation({
      name: "Main Entrance",
      floor: "Level 1",
      coordinates: { x: 100, y: 100 },
    });
  }, []);

  const destinations = [
    { id: 1, name: "Emergency Room", floor: "Level 1", category: "Medical", estimatedTime: 3, distance: 85 },
    { id: 2, name: "Radiology Department", floor: "Level 2", category: "Medical", estimatedTime: 5, distance: 120 },
    { id: 3, name: "Pharmacy", floor: "Level 1", category: "Service", estimatedTime: 2, distance: 45 },
    { id: 4, name: "Cafeteria", floor: "Level 3", category: "Service", estimatedTime: 4, distance: 95 },
  ];

  const navigationSteps = [
    {
      instruction: "Head straight towards the main reception",
      direction: "straight",
      distance: 15,
      icon: <ArrowRight className="w-5 h-5" />,
    },
    {
      instruction: "Turn left at the information desk",
      direction: "left",
      distance: 10,
      icon: <ArrowRight className="w-5 h-5 rotate-90" />,
    },
    {
      instruction: "Continue straight down the corridor",
      direction: "straight",
      distance: 25,
      icon: <ArrowRight className="w-5 h-5" />,
    },
    {
      instruction: "Take the elevator to Level 2",
      direction: "up",
      distance: 0,
      icon: <MoveVertical className="w-5 h-5" />,
    },
    {
      instruction: "Turn right after exiting the elevator",
      direction: "right",
      distance: 5,
      icon: <ArrowRight className="w-5 h-5 -rotate-90" />,
    },
    {
      instruction: "Radiology Department will be on your left",
      direction: "left",
      distance: 10,
      icon: <ArrowRight className="w-5 h-5 rotate-90" />,
    },
  ];

  const quickDestinations = [
    { name: "Emergency Room", icon: <AlertCircle className="w-4 h-4" />, color: "bg-red-500" },
    { name: "Restroom", icon: <Users className="w-4 h-4" />, color: "bg-blue-500" },
    { name: "Elevator", icon: <MoveVertical className="w-4 h-4" />, color: "bg-green-500" },
    { name: "Accessible Route", icon: <Accessibility className="w-4 h-4" />, color: "bg-purple-500" },
  ];

  const startNavigation = (dest: string) => {
    setDestination(dest);
    setIsNavigating(true);
    setStepIndex(0);
    setSelectedRoute({
      destination: dest,
      totalTime: 5,
      totalDistance: 85,
      steps: navigationSteps,
    });
  };

  const nextStep = () => {
    if (stepIndex < navigationSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsNavigating(false);
      setDestination("");
      setSelectedRoute(null);
      setStepIndex(0);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <Layout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Navigation</h1>
            <p className="text-gray-600 mt-1">Real-time indoor guidance</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              GPS Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {!isNavigating ? (
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">Where would you like to go?</h3>

                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-12 py-3 border rounded-lg"
                    placeholder="Search destination..."
                  />
                  <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {quickDestinations.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => startNavigation(d.name)}
                      className={`p-3 rounded-lg text-white flex items-center justify-center gap-2 ${d.color}`}
                    >
                      {d.icon}
                      <span className="text-sm">{d.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {destinations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => startNavigation(d.name)}
                      className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-left"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                          <div>
                            <div className="font-medium">{d.name}</div>
                            <div className="text-sm text-gray-500">{d.floor}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {d.estimatedTime} min • {d.distance}m
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Navigating to <span className="text-indigo-600">{selectedRoute.destination}</span>
                </h3>

                <div className="bg-indigo-50 rounded-xl p-6 mb-6 flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-full">
                    {navigationSteps[stepIndex].icon}
                  </div>
                  <div>
                    <div className="font-medium">
                      {navigationSteps[stepIndex].instruction}
                    </div>
                    <div className="text-sm text-gray-600">
                      {navigationSteps[stepIndex].distance > 0 &&
                        `${navigationSteps[stepIndex].distance} meters`}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={stepIndex === 0}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                  >
                    {stepIndex === navigationSteps.length - 1 ? "Complete" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">Current Location</h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <div className="font-medium">{currentLocation?.name}</div>
                  <div className="text-sm text-gray-500">{currentLocation?.floor}</div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Emergency
              </h3>
              <p className="text-sm text-red-600">Nearest exit: 25m ahead</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

