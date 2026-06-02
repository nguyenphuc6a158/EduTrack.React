import React, { useEffect, useRef } from "react";
import { Row, Col, Card, Statistic, Space } from "antd";
import {
    UserOutlined,
    TeamOutlined,
    BankOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from "@ant-design/icons";
import { type ApexOptions } from "apexcharts";
import { AppConsts } from "src/lib/appconst";
import DounutChart from "./donutChart/donutChart";
import ChartRef from "./chartRef/chartRef";
import { useDashBoardActions, useDetailDashboard } from "src/stores/detailDashboardStore";

const Dashboard: React.FC = () => {
    const dashBoardActions = useDashBoardActions();
    const detailDashboard = useDetailDashboard();
    const [areaOptions, setAreaOptions] = React.useState<ApexOptions | null>(null);
    const [donutOptions, setDonutOptions] = React.useState<ApexOptions | null>(null);

    useEffect(() => {
        dashBoardActions.getDetailDashBoard();
    }, []);
    useEffect(()=>{
        if (!detailDashboard.usersGroupByDate || !detailDashboard.usersGroupByRole) return;

        const dates = detailDashboard.usersGroupByDate.map(item => new Date(item.date).toLocaleDateString("vi-VN")) || [];
        const countsByDate = detailDashboard.usersGroupByDate.map(item => item.count) || [];
        
        const roleNames = detailDashboard.usersGroupByRole.map(item => item.roleName ?? "") || [];
        const countsByRole = detailDashboard.usersGroupByRole.map(item => item.count) || [];

        const configAreaOptions: ApexOptions = {
            series: [{
                name: 'Users',
                data: countsByDate
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
                categories: dates
            },
            tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
        };
        setAreaOptions(configAreaOptions);
        const configDonutOptions: ApexOptions = {
            series: countsByRole,
            labels: roleNames,
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
        setDonutOptions(configDonutOptions);
    },[detailDashboard])
    return (
        <div className="p-6 bg-layout min-h-full transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Thống kê dữ liệu hệ thống</h2>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Số lượng người dùng</span>}
                            value={detailDashboard.totalUsers | 0}
                            prefix={<TeamOutlined className="text-blue-500" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Số lượng lớp học</span>}
                            value={detailDashboard.countClasses || 0}
                            prefix={<BankOutlined className="text-emerald-500" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Số lượng học sinh</span>}
                            value={detailDashboard.countStudents || 0}
                            prefix={<TeamOutlined className="text-amber-500" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Số lượng giáo viên</span>}
                            value={detailDashboard.countTeachers || 0}
                            prefix={<TeamOutlined className="text-amber-500" />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<span className="text-slate-800 font-semibold">Biểu đồ tăng trưởng người dùng</span>}

                        className="shadow-sm"
                    >
                        {areaOptions && (
                            <ChartRef areaOptions={areaOptions} />
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={<span className="text-slate-800 font-semibold">Role Distribution</span>}

                        className="shadow-sm"
                    >
                        {donutOptions && (
                            <DounutChart 
                                donutOptions={donutOptions}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
