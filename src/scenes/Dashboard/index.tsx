import React, { useEffect, useRef } from "react";
import { Row, Col, Card, Statistic, Space } from "antd";
import {
    UserOutlined,
    TeamOutlined,
    BankOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from "@ant-design/icons";
import ApexCharts, { type ApexOptions } from "apexcharts";
import { useUsers } from "src/stores/userStore";
import { useRoles } from "src/stores/roleStore";
import { useTenants } from "src/stores/tenantStore";
import { AppConsts } from "src/lib/appconst";

const Dashboard: React.FC = () => {
    const users = useUsers();
    const roles = useRoles();
    const tenants = useTenants();

    const chartRef = useRef<HTMLDivElement>(null);
    const donutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current || !donutRef.current) return;

        const areaOptions: ApexOptions = {
            series: [{
                name: 'Users',
                data: [31, 40, 28, 51, 42, 109, 100]
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: { show: false },
                fontFamily: 'Inter, sans-serif'
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            colors: [AppConsts.COLOR_PRIMARY],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                }
            },
            xaxis: {
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
        };

        const areaChart = new ApexCharts(chartRef.current, areaOptions);
        areaChart.render();

        // --- Donut Chart for Distribution ---
        const donutOptions: ApexOptions = {
            series: [44, 55, 41, 17],
            labels: ['Admin', 'Editor', 'User', 'Guest'],
            chart: {
                type: 'donut',
                height: 350,
                fontFamily: 'Inter, sans-serif'
            },
            colors: [AppConsts.COLOR_PRIMARY, '#10b981', '#f59e0b', '#ef4444'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total Roles',
                                fontSize: '14px',
                                color: '#6b7280'
                            }
                        }
                    }
                }
            },
            legend: { position: 'bottom' },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' }
                }
            }]
        };

        const donutChart = new ApexCharts(donutRef.current, donutOptions);
        donutChart.render();

        return () => {
            areaChart?.destroy();
            donutChart?.destroy();
        };
    }, []);

    return (
        <div className="p-6 bg-layout min-h-full transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Dashboard Overview</h2>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Total Users</span>}
                            value={users.length || 1240}
                            prefix={<UserOutlined className="text-blue-500" />}
                            suffix={<span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full"><ArrowUpOutlined /> 12%</span>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">System Roles</span>}
                            value={roles.length || 8}
                            prefix={<TeamOutlined className="text-emerald-500" />}
                            suffix={<span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Stable</span>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Active Tenants</span>}
                            value={tenants.length || 45}
                            prefix={<BankOutlined className="text-amber-500" />}
                            suffix={<span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full"><ArrowDownOutlined /> 2%</span>}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Monthly Revenue</span>}
                            value={12840}
                            prefix={<span className="text-indigo-500 mr-1">$</span>}
                            precision={2}
                            suffix={<span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full"><ArrowUpOutlined /> 8%</span>}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<span className="text-slate-800 font-semibold">User Activity & Growth</span>}

                        className="shadow-sm"
                    >
                        <div ref={chartRef} />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={<span className="text-slate-800 font-semibold">Role Distribution</span>}

                        className="shadow-sm"
                    >
                        <div ref={donutRef} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
