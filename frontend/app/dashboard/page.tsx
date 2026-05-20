"use client";

import { useDevice } from "@/hooks/useDevice";

import DesktopDashboard from "@/components/dashboard/DesktopDashboard";
import TabletDashboard from "@/components/dashboard/TabletDashboard";
import MobileDashboard from "@/components/dashboard/MobileDashboard";

export default function DashboardPage() {
  const device = useDevice();

  if (device === "mobile") {
    return <MobileDashboard />;
  }

  if (device === "tablet") {
    return <TabletDashboard />;
  }

  return <DesktopDashboard />;
}
