import React, { useState } from "react";
import {
    ClipboardList,
    Search,
    Filter,
    ChevronDown,
    Eye,
    FileText,
    Trash
} from "lucide-react";

const orders = [
    { id: '001', customer: 'John Doe', contact: '+1234567890', items: 'Chocolate Cake 1kg', total: '$25', payment: 'Online', status: 'New', type: 'Pickup', pickupTime: '4:00 PM' },
    { id: '002', customer: 'Jane Smith', contact: '+1234567891', items: 'Vanilla Cupcakes (12)', total: '$18', payment: 'Cash on Delivery', status: 'Preparing', type: 'Delivery', address: '123 Street, City' },
    { id: '003', customer: 'Mike Johnson', contact: '+1234567892', items: 'Red Velvet Cake 2kg', total: '$40', payment: 'Online', status: 'Ready for Pickup', type: 'Pickup', pickupTime: '6:00 PM' }
];

const statuses = ['New', 'Preparing', 'Ready for Pickup', 'Completed', 'Canceled'];

const OrderManagement = () => {
    const [orderList, setOrderList] = useState(orders);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [statusDropdown, setStatusDropdown] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        setOrderList(orderList.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
        setStatusDropdown(null);
    };

    const handleDeleteOrder = (id) => {
        setOrderList(orderList.filter(order => order.id !== id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return 'bg-blue-50 text-blue-700 ring-blue-600/20';
            case 'Preparing':
                return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
            case 'Ready for Pickup':
                return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
            case 'Completed':
                return 'bg-gray-50 text-gray-700 ring-gray-600/20';
            case 'Canceled':
                return 'bg-red-50 text-red-700 ring-red-600/20';
            default:
                return 'bg-gray-50 text-gray-700 ring-gray-600/20';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 ml-72">
            <div className="p-8 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-8 mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                            <ClipboardList className="w-7 h-7 text-gray-700" />
                            Orders
                            <span className="text-sm font-normal text-gray-500">
                                ({orderList.length} total)
                            </span>
                        </h1>
                        <div className="text-lg font-semibold text-gray-800">
                            Total Orders Till Now: {orders.length}
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {orderList.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-gray-900">#{order.id}</td>
                                    <td className="py-4 px-6 text-gray-800">{order.customer}</td>
                                    <td className="py-4 px-6 text-gray-500">{order.items}</td>
                                    <td className="py-4 px-6 font-medium text-gray-900">{order.total}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => setStatusDropdown(statusDropdown === order.id ? null : order.id)}
                                            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(order.status)}`}
                                        >
                                            {order.status}
                                            <ChevronDown className="w-3 h-3" />
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 flex gap-3 justify-end">
                                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900" title="View Order Details">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteOrder(order.id)} className="p-2 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-900" title="Delete Order">
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
