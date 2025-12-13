"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { 
  Users, 
  DollarSign, 
  MapPin, 
  Navigation, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Activity,
  Upload,
  BarChart3,
  Map,
  ArrowRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const navigationData = [
    { day: "Mon", sessions: 342, successRate: 98 },
    { day: "Tue", sessions: 456, successRate: 99 },
    { day: "Wed", sessions: 523, successRate: 97 },
    { day: "Thu", sessions: 489, successRate: 98 },
    { day: "Fri", sessions: 612, successRate: 99 },
    { day: "Sat", sessions: 234, successRate: 96 },
    { day: "Sun", sessions: 189, successRate: 95 },
  ];

  const departmentUsage = [
    { department: "Emergency", usage: 89 },
    { department: "Radiology", usage: 76 },
    { department: "Surgery", usage: 82 },
    { department: "Pediatrics", usage: 65 },
    { department: "Pharmacy", usage: 71 },
  ];

  const systemMetrics = [
    { 
      title: "Daily Navigation Sessions", 
      value: "1,245", 
      change: "+12.5%", 
      trend: "up",
      icon: <Navigation className="w-6 h-6" />,
      color: "bg-indigo-500"
    },
    { 
      title: "Active Maps", 
      value: "23", 
      change: "+2", 
      trend: "up",
      icon: <Map className="w-6 h-6" />,
      color: "bg-green-500"
    },
    { 
      title: "Success Rate", 
      value: "98.2%", 
      change: "+0.8%", 
      trend: "up",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    { 
      title: "Avg. Navigation Time", 
      value: "3.2 min", 
      change: "-15 sec", 
      trend: "down",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-orange-500"
    },
  ];

  const systemStatus = [
    { name: "Navigation Engine", status: "operational", uptime: "99.9%" },
    { name: "Map Processing", status: "operational", uptime: "99.7%" },
    { name: "Analytics Database", status: "operational", uptime: "99.8%" },
    { name: "API Gateway", status: "degraded", uptime: "98.5%" },
  ];

  const recentActivity = [
    { 
      type: "upload", 
      description: "New floor plan uploaded for West Wing",
      time: "2 minutes ago",
      icon: <Upload className="w-4 h-4" />
    },
    { 
      type: "navigation", 
      description: "High traffic detected in Emergency department",
      time: "15 minutes ago",
      icon: <Activity className="w-4 h-4" />
    },
    { 
      type: "alert", 
      description: "Navigation route optimization completed",
      time: "1 hour ago",
      icon: <TrendingUp className="w-4 h-4" />
    },
    { 
      type: "success", 
      description: "Monthly analytics report generated",
      time: "3 hours ago",
      icon: <BarChart3 className="w-4 h-4" />
    },
  ];

  return (
    <Layout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your facility navigation overview.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Map
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="bg-white p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${metric.color} bg-opacity-10 rounded-lg ${metric.color.replace('bg-', 'text-')}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Navigation Sessions Chart */}
          <Card className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Sessions (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={navigationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Usage Chart */}
          <Card className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Usage (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="usage" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* System Status & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card className="bg-white p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
            </div>
            <div className="space-y-3">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {service.status === "operational" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500">Uptime: {service.uptime}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    service.status === "operational" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className={`p-2 rounded-lg mr-3 ${
                    activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'navigation' ? 'bg-green-100 text-green-600' :
                    activity.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                    'bg-indigo-100 text-indigo-600'
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 border-0 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to optimize your navigation?</h3>
              <p className="text-indigo-100">Upload new maps or analyze current performance to improve visitor experience.</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition font-medium">
                Upload Maps
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium border border-white">
                View Analytics
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}