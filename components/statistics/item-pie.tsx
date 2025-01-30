/*
import DashPieChart from "./dash-pie-chart";
import { ChartConfig } from "@/components/ui/chart";
*/

export default async function DevicePie() {
    return (
        <div>
            <h1>Device Pie</h1>
        </div>
    )
    /*const statusData = await prisma.status.findMany();
    const chartData = [];
    const chartConfig: ChartConfig = {};


    for (const status of statusData) {
        const items = await prisma.item.count({
            where: {
                statusId: status.id,
            },
        });

        chartData.push({
            deviceItem: status.name.toLowerCase(),
            amount: items,
            fill: status.color,
        });

        chartConfig[status.name.toLowerCase()] = {
            label: status.name,
            color: status.color,
        };
    }

    chartConfig["items"] = { label: "items" };

    console.log(chartData);
    console.log(chartConfig);

    return (
        <DashPieChart chartData={chartData} chartConfig={chartConfig} title="Items" description="This pie chart shows the amount of items by status." />
    );*/
}
