import type { ApexOptions } from "apexcharts";
import ApexCharts from "apexcharts";
import type React from "react";
import { useEffect, useRef } from "react";
interface IDonutChartProps {
	donutOptions: ApexOptions
}
const DounutChart: React.FC<IDonutChartProps> = ({donutOptions}) => {
	const donutRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!donutRef.current) return;
		const donutChart = new ApexCharts(donutRef.current, donutOptions);
		donutChart.render();

		return () => {
			donutChart?.destroy();
		};
	},[donutOptions]);

	return(
		<div ref={donutRef} />
	)
}
export default DounutChart;