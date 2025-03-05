import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
                <Icon size={24} className="text-blue-600" />
            </div>
        </div>
    </div>
);

const salesTrends = [
    { name: 'Week 1', sales: 4000 },
    { name: 'Week 2', sales: 3000 },
    { name: 'Week 3', sales: 5000 },
    { name: 'Week 4', sales: 2780 }
];

const weeklyData = [
    { name: 'Mon', sales: 1200, orders: 8 },
    { name: 'Tue', sales: 1400, orders: 10 },
    { name: 'Wed', sales: 1300, orders: 9 },
    { name: 'Thu', sales: 1500, orders: 12 },
    { name: 'Fri', sales: 1800, orders: 15 },
    { name: 'Sat', sales: 2200, orders: 18 },
    { name: 'Sun', sales: 1600, orders: 11 }
];

const monthlyData = [
    { name: 'Week 1', sales: 8400, orders: 70 },
    { name: 'Week 2', sales: 9600, orders: 82 },
    { name: 'Week 3', sales: 11200, orders: 95 },
    { name: 'Week 4', sales: 10400, orders: 88 }
];

const popularProducts = [
    { name: 'Chocolate Cake', orders: 45 },
    { name: 'Vanilla Cake', orders: 35 },
    { name: 'Red Velvet', orders: 30 },
    { name: 'Cupcakes', orders: 25 }
];

const revenueBreakdown = [
    { name: 'Regular Cakes', value: 4500 },
    { name: 'Custom Cakes', value: 3500 },
    { name: 'Cupcakes', value: 2000 },
    { name: 'Special Orders', value: 3000 }
];

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6 ml-72 bg-gray-100 min-h-screen">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={ShoppingBag}
                    title="Today's Sales"
                    value="12 Orders"
                />
                <StatCard
                    icon={DollarSign}
                    title="Today's Revenue"
                    value="$890"
                />
                <StatCard
                    icon={DollarSign}
                    title="Monthly Revenue"
                    value="$13,590"
                />
                <StatCard
                    icon={Package}
                    title="Active Orders"
                    value="5"
                />
            </div>

            {/* Orders Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Active Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Item</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Contact</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Pickup</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {[
                            { id: '001', item: 'Chocolate Cake 1kg', customer: 'John Doe', contact: '+1234567890', pickup: '4:00 PM', status: 'Preparing' },
                            { id: '002', item: 'Vanilla Cupcakes (12)', customer: 'Jane Smith', contact: '+1234567891', pickup: '5:30 PM', status: 'New' },
                            { id: '003', item: 'Red Velvet Cake 2kg', customer: 'Mike Johnson', contact: '+1234567892', pickup: '6:00 PM', status: 'New' }
                        ].map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-500">#{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{order.item}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{order.contact}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{order.pickup}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            order.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Weekly Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales ($)" stroke="#3B82F6" />
                        <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#10B981" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Trends */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales ($)" stroke="#3B82F6" />
                            <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#10B981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Popular Products */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Popular Products</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={popularProducts} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" name="Orders" fill="#36A2EB" />
                            <Bar dataKey="revenue" name="Revenue ($)" fill="#FF6384" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Revenue Breakdown</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={revenueBreakdown}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {revenueBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;