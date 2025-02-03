"use client"

import DashPieChart from "./dash-pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { Item } from "@/lib/types";

// API functions
import { fetchItems } from "@/lib/itemsApi"

// React Query
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";

export default function ItemPie() {
    const chartData: { deviceItem: string; amount: number; fill: string }[] = []
    const chartConfig: ChartConfig = {}

    const { data: items, isLoading, isError } = useQuery<Item[], Error>({
        queryKey: ["items"],
        queryFn: fetchItems,
    })

    if (isLoading) return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
        </div>
    )
    if (isError) return <div>Error loading items</div>

    // Group devices by status
    const itemsByStatus = items?.reduce((acc, item) => {
        const status = item.Status.name.toLowerCase()
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {} as Record<string, number>) || {}

    // Create chart data
    Object.entries(itemsByStatus).forEach(([status, count]) => {
        chartData.push({
            deviceItem: status,
            amount: count,
            fill: items?.find(i => i.Status.name.toLowerCase() === status)?.Status.color || '#000',
        })
    })

    return (
        <DashPieChart chartData={chartData} chartConfig={chartConfig} title="Items" description="This pie chart shows the amount of items by status." />
    )
}
