import React from 'react';
import { Download, Share2 } from 'lucide-react';

const mockUrl = "https://hospinav.pro/scan/42-F20";
const qrColor = "rgb(var(--color-primary-rgb))"; 

export default function QRPage() {

// Placeholder for an actual QR code SVG component (Clean & professional look)
const qrSvgPlaceholder = (
<svg width="250" height="250" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
<rect width="250" height="250" fill="#FFFFFF" rx="15"/>
{/* Mock QR corner markers */}
<rect x="25" y="25" width="50" height="50" fill={qrColor}/>
<rect x="25" y="175" width="50" height="50" fill={qrColor}/>
<rect x="175" y="25" width="50" height="50" fill={qrColor}/>
{/* Mock QR pattern */}
<rect x="90" y="90" width="70" height="70" fill={qrColor} opacity="0.9"/>
<rect x="110" y="170" width="10" height="10" fill={qrColor}/>
<rect x="170" y="110" width="10" height="10" fill={qrColor}/>
<text x="125" y="125" fontSize="16" fill="#FFFFFF" textAnchor="middle" alignmentBaseline="middle">MAP</text>
</svg>
);

return (
<section className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-gray-100">
<div className="w-full max-w-lg rounded-2xl bg-card p-10 shadow-2xl text-center border border-gray-100">
    <h3 className="text-3xl font-bold mb-4 text-gray-800">Deployment QR Code 📱</h3>
    <p className="mb-8 text-lg text-muted-foreground">Print this code and place it at your map's starting point.</p>

    {/* QR Code Container */}
    <div className="p-4 inline-block bg-white rounded-xl shadow-inner border-8 border-indigo-100">
        {qrSvgPlaceholder}
    </div>

    <p className="mt-8 mb-4 text-sm font-medium text-muted-foreground">
        Direct Link: <span className="text-primary font-semibold truncate">{mockUrl}</span>
    </p>

    <div className="flex gap-4 justify-center">
        <button className="inline-flex items-center justify-center rounded-lg text-base font-medium h-10 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="h-5 w-5 mr-2" /> Download (PNG)
        </button>
        <button className="inline-flex items-center justify-center rounded-lg text-base font-medium h-10 px-6 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors">
            <Share2 className="h-5 w-5 mr-2" /> Share Link
        </button>
    </div>
</div>
</section>
);
}
