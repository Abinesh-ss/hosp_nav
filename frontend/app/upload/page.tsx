"use client";

import { useEffect } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { BarChart3, Upload, Navigation, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Layout auth>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Navigation performance overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Daily Sessions" value="1,248" icon={<Navigation />} />
          <Card title="Active Maps" value="23" icon={<Upload />} />
          <Card title="Success Rate" value="98.4%" icon={<TrendingUp />} />
          <Card title="Reports" value="12" icon={<BarChart3 />} />
        </div>

        <Card>
          <h3 className="text-lg font-semibold mb-2">System Status</h3>
          <p className="text-gray-600">
            All navigation services are operational.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
