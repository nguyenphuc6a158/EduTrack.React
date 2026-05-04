import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Card, Statistic, Spin, Empty } from "antd";
import {
	UserOutlined,
	TeamOutlined,
	BankOutlined,
	ReadOutlined,
} from "@ant-design/icons";
import { type ApexOptions } from "apexcharts";
import { useUsers, useUserTotal, useUserLoading, useUserActions } from "src/stores/userStore";
import { useRoleTotal, useRoleLoading, useRoleActions } from "src/stores/roleStore";
import { useTenantTotal, useTenantLoading, useTenantActions } from "src/stores/tenantStore";
import {
	usetotalCountAssignment,
	useAssignmentLoading,
	useAssignmentActions,
} from "src/stores/assignmentStore";
import { PageShell } from "src/components/PageShell";
import { AppConsts, ResponsiveBreakpoints, ResponsiveSpacing } from "src/lib/appconst";
import DounutChart from "./donutChart/donutChart";
import ChartRef from "./chartRef/chartRef";
import { buildNewUsersPerDaySeries, buildUserCountByRole, getLast7DayLabels } from "./dashboardStats";

const DASHBOARD_PAGE_SIZE = 500;

const Dashboard: React.FC = () => {
	const users = useUsers();
	const userTotal = useUserTotal();
	const userLoading = useUserLoading();
	const userActions = useUserActions();

	const roleTotal = useRoleTotal();
	const roleLoading = useRoleLoading();
	const roleActions = useRoleActions();

	const tenantTotal = useTenantTotal();
	const tenantLoading = useTenantLoading();
	const tenantActions = useTenantActions();

	const assignmentTotal = usetotalCountAssignment();
	const assignmentLoading = useAssignmentLoading();
	const assignmentActions = useAssignmentActions();

	const [fetchError, setFetchError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			setFetchError(null);
			const results = await Promise.allSettled([
				userActions.getAll(undefined, undefined, undefined, 0, DASHBOARD_PAGE_SIZE),
				roleActions.getAll(undefined, undefined, 0, DASHBOARD_PAGE_SIZE),
				tenantActions.getAll(undefined, undefined, undefined, 0, DASHBOARD_PAGE_SIZE),
				assignmentActions.getAll(undefined, 0, DASHBOARD_PAGE_SIZE),
			]);
			if (cancelled) return;
			const failed = results.filter((r) => r.status === "rejected");
			if (failed.length > 0) {
				setFetchError("Một số dữ liệu không tải được. Kiểm tra quyền truy cập hoặc kết nối mạng.");
			}
		};
		void load();
		return () => {
			cancelled = true;
		};
	}, [userActions, roleActions, tenantActions, assignmentActions]);

	const pageLoading =
		userLoading || roleLoading || tenantLoading || assignmentLoading;

	const areaOptions = useMemo<ApexOptions>(() => {
		const categories = getLast7DayLabels();
		const data = buildNewUsersPerDaySeries(users);
		return {
			series: [
				{
					name: "Người dùng mới",
					data,
				},
			],
			chart: {
				height: 350,
				type: "area",
				toolbar: { show: false },
				fontFamily: "Inter, sans-serif",
			},
			dataLabels: { enabled: false },
			stroke: { curve: "smooth", width: 3 },
			colors: [AppConsts.COLOR_PRIMARY],
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.45,
					opacityTo: 0.05,
					stops: [20, 100, 100, 100],
				},
			},
			xaxis: {
				categories,
			},
			yaxis: {
				labels: {
					formatter: (val: number) => String(Math.floor(val)),
				},
				min: 0,
				forceNiceScale: true,
			},
			tooltip: {
				y: { formatter: (val: number) => `${Math.floor(val)} người` },
			},
		};
	}, [users]);

	const donutOptions = useMemo<ApexOptions>(() => {
		const { labels, series } = buildUserCountByRole(users);
		const baseColors = [
			AppConsts.COLOR_PRIMARY,
			"#10b981",
			"#f59e0b",
			"#ef4444",
			"#6366f1",
			"#8b5cf6",
			"#ec4899",
			"#14b8a6",
		];
		const colors = labels.map((_, i) => baseColors[i % baseColors.length]);
		return {
			series,
			labels,
			colors,
			chart: {
				type: "donut",
				height: 350,
				fontFamily: "Inter, sans-serif",
			},
			plotOptions: {
				pie: {
					donut: {
						size: "70%",
						labels: {
							show: true,
							total: {
								show: true,
								label: "Tổng (lượt gán)",
								fontSize: "14px",
								color: "#6b7280",
							},
						},
					},
				},
			},
			legend: { position: "bottom" },
			responsive: [
				{
					breakpoint: ResponsiveBreakpoints.sm,
					options: {
						chart: { width: 200 },
						legend: { position: "bottom" },
					},
				},
			],
		};
	}, [users]);

	const donutSeries = donutOptions.series;
	const hasDonutData =
		users.length > 0 &&
		Array.isArray(donutSeries) &&
		donutSeries.length > 0 &&
		donutSeries.some((v) => (typeof v === "number" ? v > 0 : true));

	return (
		<PageShell className="bg-layout min-h-full transition-colors duration-300">
			<Spin spinning={pageLoading}>
				<h2 className="text-2xl font-bold mb-6 text-text-primary">Tổng quan</h2>
				{fetchError ? (
					<p className="mb-4 text-amber-600 text-sm" role="status">
						{fetchError}
					</p>
				) : null}

				<Row gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]} className="mb-6">
					<Col xs={24} sm={12} lg={6}>
						<Card className="shadow-sm hover:shadow-md transition-shadow">
							<Statistic
								title={<span className="text-slate-500 font-medium">Người dùng</span>}
								value={userTotal}
								prefix={<UserOutlined className="text-blue-500" />}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card className="shadow-sm hover:shadow-md transition-shadow">
							<Statistic
								title={<span className="text-slate-500 font-medium">Vai trò</span>}
								value={roleTotal}
								prefix={<TeamOutlined className="text-emerald-500" />}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card className="shadow-sm hover:shadow-md transition-shadow">
							<Statistic
								title={<span className="text-slate-500 font-medium">Tenant</span>}
								value={tenantTotal}
								prefix={<BankOutlined className="text-amber-500" />}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card className="shadow-sm hover:shadow-md transition-shadow">
							<Statistic
								title={<span className="text-slate-500 font-medium">Bài tập</span>}
								value={assignmentTotal}
								prefix={<ReadOutlined className="text-indigo-500" />}
							/>
						</Card>
					</Col>
				</Row>

				<Row gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]}>
					<Col xs={24} lg={16}>
						<Card
							title={
								<span className="text-slate-800 font-semibold">
									Người dùng mới theo ngày (7 ngày gần nhất)
								</span>
							}
							className="shadow-sm"
						>
							<p className="text-xs text-slate-500 mb-2">
								Dựa trên tối đa {DASHBOARD_PAGE_SIZE} bản ghi người dùng gần nhất đã tải.
							</p>
							<ChartRef areaOptions={areaOptions} />
						</Card>
					</Col>
					<Col xs={24} lg={8}>
						<Card
							title={
								<span className="text-slate-800 font-semibold">
									Phân bổ vai trò (theo danh sách đã tải)
								</span>
							}
							className="shadow-sm"
						>
							{hasDonutData ? (
								<DounutChart donutOptions={donutOptions} />
							) : (
								<Empty description="Chưa có người dùng để thống kê vai trò" />
							)}
						</Card>
					</Col>
				</Row>
			</Spin>
		</PageShell>
	);
};

export default Dashboard;
