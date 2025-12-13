"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { 
  QrCode, 
  Download, 
  Plus, 
  Copy, 
  MapPin, 
  Building, 
  Smartphone,
  ExternalLink,
  CheckCircle,
  Settings,
  Trash2,
  Edit,
  Share2
} from "lucide-react";

export default function QRCodeGenerator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [qrSize, setQrSize] = useState("medium");
  const [includeLogo, setIncludeLogo] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);
    
    // Initialize with sample QR codes
    setQrCodes([
      {
        id: 1,
        location: "Main Entrance",
        destination: "Main Reception",
        url: "https://hospinav.pro/nav/main-entrance",
        scans: 245,
        created: "2024-01-15",
        size: "medium",
        status: "active"
      },
      {
        id: 2,
        location: "Parking Lot A",
        destination: "Emergency Room",
        url: "https://hospinav.pro/nav/parking-a-emergency",
        scans: 189,
        created: "2024-01-14",
        size: "large",
        status: "active"
      },
      {
        id: 3,
        location: "Elevator Level 1",
        destination: "Radiology Department",
        url: "https://hospinav.pro/nav/elevator-radiology",
        scans: 156,
        created: "2024-01-13",
        size: "small",
        status: "active"
      }
    ]);
  }, []);

  const locations = [
    { id: 1, name: "Main Entrance", floor: "Level 1", type: "entrance" },
    { id: 2, name: "Emergency Room", floor: "Level 1", type: "medical" },
    { id: 3, name: "Radiology Department", floor: "Level 2", type: "medical" },
    { id: 4, name: "Pharmacy", floor: "Level 1", type: "service" },
    { id: 5, name: "Parking Lot A", floor: "Ground", type: "parking" },
    { id: 6, name: "Cafeteria", floor: "Level 3", type: "service" },
  ];

  const generateQRCode = () => {
    if (!selectedLocation) return;
    
    const location = locations.find(l => l.id === parseInt(selectedLocation));
    const url = customUrl || `https://hospinav.pro/nav/${location.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const newQRCode = {
      id: Date.now(),
      location: location.name,
      destination: location.name,
      url: url,
      scans: 0,
      created: new Date().toISOString().split('T')[0],
      size: qrSize,
      status: "active"
    };
    
    setQrCodes(prev => [newQRCode, ...prev]);
    setSelectedLocation("");
    setCustomUrl("");
  };

  const deleteQRCode = (id) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
  };

  const downloadQRCode = (qrCode) => {
    // Simulate download
    alert(`Downloading QR code for ${qrCode.location}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const getSizeValue = (size) => {
    switch(size) {
      case 'small': return 150;
      case 'medium': return 250;
      case 'large': return 350;
      default: return 250;
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Layout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
            <p className="text-gray-600 mt-1">Create QR codes for physical navigation points</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create New QR Code */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create QR Code</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.floor})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom URL (optional)
                  </label>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://hospinav.pro/nav/custom"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['small', 'medium', 'large'].map(size => (
                      <button
                        key={size}
                        onClick={() => setQrSize(size)}
                        className={`px-3 py-2 rounded-lg border transition capitalize ${
                          qrSize === size
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="include-logo"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                  <label htmlFor="include-logo" className="ml-2 text-sm text-gray-700">
                    Include HospiNav Pro logo
                  </label>
                </div>

                <button
                  onClick={generateQRCode}
                  disabled={!selectedLocation}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Generate QR Code
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total QR Codes</span>
                  <span className="font-semibold text-gray-900">{qrCodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Scans</span>
                  <span className="font-semibold text-gray-900">
                    {qrCodes.reduce((sum, qr) => sum + qr.scans, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Codes</span>
                  <span className="font-semibold text-green-600">
                    {qrCodes.filter(qr => qr.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Scans/Code</span>
                  <span className="font-semibold text-gray-900">
                    {qrCodes.length > 0 ? Math.round(qrCodes.reduce((sum, qr) => sum + qr.scans, 0) / qrCodes.length) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Codes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Generated QR Codes</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Export All
                  </button>
                </div>
              </div>

              {qrCodes.length === 0 ? (
                <div className="text-center py-12">
                  <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No QR codes generated yet</p>
                  <p className="text-sm text-gray-400">Create your first QR code to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {qrCodes.map((qrCode) => (
                    <div key={qrCode.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{qrCode.location}</h4>
                          <p className="text-sm text-gray-500">Created {qrCode.created}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => downloadQRCode(qrCode)}
                            className="p-1 hover:bg-gray-100 rounded transition"
                          >
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(qrCode.url)}
                            className="p-1 hover:bg-gray-100 rounded transition"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => deleteQRCode(qrCode.id)}
                            className="p-1 hover:bg-gray-100 rounded transition"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* QR Code Preview */}
                      <div className="flex justify-center mb-4">
                        <div 
                          className="bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center"
                          style={{ 
                            width: `${getSizeValue(qrCode.size)}px`, 
                            height: `${getSizeValue(qrCode.size)}px` 
                          }}
                        >
                          <QrCode className="w-1/2 h-1/2 text-gray-400" />
                        </div>
                      </div>

                      {/* QR Code Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-600 truncate">{qrCode.url}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">{qrCode.scans} scans</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            qrCode.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {qrCode.status}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Size: {qrCode.size}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 py-2 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium flex items-center justify-center">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
                        <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium flex items-center justify-center">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deployment Guide */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Deployment Guide</h3>
              <p className="text-indigo-100">
                Place QR codes at strategic locations throughout your facility. Ensure they're visible, 
                well-lit, and at a comfortable scanning height (4-5 feet).
              </p>
            </div>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition font-medium">
              View Guide
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}