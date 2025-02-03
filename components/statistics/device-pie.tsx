"use client"

import { Loader2 } from "lucide-react";
import DashPieChart from "./dash-pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { Device } from "@/lib/types";

// API functions
import { fetchDevices } from "@/lib/devicesApi"

// React Query
import { useQuery } from "@tanstack/react-query"

export default function DevicePie() {
    const chartData: { deviceItem: string; amount: number; fill: string }[] = []
    const chartConfig: ChartConfig = {}

    const { data: devices, isLoading, isError } = useQuery<Device[], Error>({
        queryKey: ["devices"],
        queryFn: fetchDevices,
    })

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
        </div>
    )
    if (isError) return <div>Error loading devices</div>

    // Group devices by status
    const devicesByStatus = devices?.reduce((acc, device) => {
        const status = device.Status.name.toLowerCase()
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {} as Record<string, number>) || {}

    // Create chart data
    Object.entries(devicesByStatus).forEach(([status, count]) => {
        chartData.push({
            deviceItem: status,
            amount: count,
            fill: devices?.find(d => d.Status.name.toLowerCase() === status)?.Status.color || '#000',
        })
    })

    return (
        <DashPieChart chartData={chartData} chartConfig={chartConfig} title="Devices" description="This pie chart shows the amount of devices by status." />
    )
}
