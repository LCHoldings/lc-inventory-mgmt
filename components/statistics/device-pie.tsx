import DashPieChart from "./dash-pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { prisma } from "@/prisma";

export default async function DevicePie() {
    const statusData = await prisma.status.findMany();
    const chartData = [];
    const chartConfig: ChartConfig = {};

    for (const status of statusData) {
        const devices = await prisma.device.count({
            where: {
                statusId: status.id,
            },
        });

        chartData.push({
            deviceItem: status.name.toLowerCase(),
            amount: devices,
            fill: status.color,
        });

        chartConfig[status.name.toLowerCase()] = {
            label: status.name,
            color: status.color,
        };
    }

    chartConfig["devices"] = { label: "Devices" };

    console.log(chartData);
    console.log(chartConfig);

    return (
        <DashPieChart chartData={chartData} chartConfig={chartConfig} title="Devices" description="This pie chart shows the amount of devices by status." />
    );
}
