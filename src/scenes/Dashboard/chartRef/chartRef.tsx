import type { ApexOptions } from "apexcharts";
import ApexCharts from "apexcharts";
import type React from "react";
import { useEffect, useRef } from "react";
interface IChartRefProps {
	areaOptions: ApexOptions;
}
const ChartRef: React.FC<IChartRefProps> = ({areaOptions}) => {
	const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const areaChart = new ApexCharts(chartRef.current, areaOptions);
        areaChart.render();
        return () => {
            areaChart?.destroy();
        };
    }, []);
	return(
		<div ref={chartRef} />
	)
}
export default ChartRef