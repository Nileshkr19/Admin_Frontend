import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Users,
    Clock,
    Globe,
    TrendingUp,
    Coffee,
    Calendar,
    BarChart3,
} from 'lucide-react';

// Initialize Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

// Initialize Google Analytics
ReactGA.initialize('YOUR-GA4-MEASUREMENT-ID');

function App() {
    const [activeTimeRange, setActiveTimeRange] = useState('7d');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [activeTimeRange]);

    // Sample data - In a real app, this would come from GA4
    const visitorData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Visitors',
                data: [1200, 1900, 1500, 1800, 2100, 2500, 2200],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
            },
        ],
    };

    const orderData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Orders',
                data: [45, 59, 80, 81, 56, 95, 78],
                backgroundColor: 'rgb(37, 99, 235)',
            },
        ],
    };

    const deviceData = {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
            {
                data: [55, 35, 10],
                backgroundColor: ['rgb(37, 99, 235)', 'rgb(96, 165, 250)', 'rgb(191, 219, 254)'],
            },
        ],
    };

    const stats = [
        {
            title: 'Total Visitors',
            value: '13.2k',
            change: '+12%',
            icon: Users,
        },
        {
            title: 'Avg. Session Duration',
            value: '4m 32s',
            change: '+5%',
            icon: Clock,
        },
        {
            title: 'Page Views',
            value: '42.5k',
            change: '+18%',
            icon: Globe,
        },
        {
            title: 'Conversion Rate',
            value: '3.2%',
            change: '+2%',
            icon: TrendingUp,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 ml-72">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                            <h1 className="ml-2 text-2xl font-semibold text-gray-900">
                                Analytics
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <select
                                value={activeTimeRange}
                                onChange={(e) => setActiveTimeRange(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                            {stats.map((stat) => (
                                <div
                                    key={stat.title}
                                    className="bg-white overflow-hidden shadow rounded-lg"
                                >
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <stat.icon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                                        {stat.title}
                                                    </dt>
                                                    <dd className="flex items-baseline">
                                                        <div className="text-2xl font-semibold text-gray-900">
                                                            {stat.value}
                                                        </div>
                                                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                            {stat.change}
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Visitors Chart */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Visitor Traffic
                                </h2>
                                <Line
                                    data={visitorData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top'
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Orders Chart */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Daily Orders
                                </h2>
                                <Bar
                                    data={orderData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top'
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Device Distribution */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Device Distribution
                                </h2>
                                <div className="h-[300px] flex items-center justify-center">
                                    <Doughnut
                                        data={deviceData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Popular Pages */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Popular Pages
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { path: '/', views: '5.2k', time: '2:30' },
                                        { path: '/menu', views: '3.8k', time: '3:15' },
                                        { path: '/order', views: '2.9k', time: '4:20' },
                                        { path: '/about', views: '1.5k', time: '1:45' },
                                    ].map((page) => (
                                        <div
                                            key={page.path}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{page.path}</p>
                                                <p className="text-sm text-gray-500">
                                                    Avg. Time: {page.time}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">{page.views}</p>
                                                <p className="text-sm text-gray-500">views</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;