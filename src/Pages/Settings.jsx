import React, { useState } from 'react';
import {
    Settings,
    Store,
    Clock,
    Shield ,
    Bell,
    Save,
} from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('general');
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState({
        orderAlerts: true,
        stockAlerts: true,
        businessAlerts: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleNotificationChange = (e) => {
        setNotifications({ ...notifications, [e.target.name]: e.target.checked });
    };

    return (
        <div className="min-h-screen bg-gray-50 ml-72">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <Settings /> Admin Settings
                        </h1>
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:grid md:grid-cols-12 md:gap-6">
                    {/* Sidebar */}
                    <aside className="md:col-span-3">
                        <nav className="space-y-1">
                            {[
                                { id: 'general', name: 'General Settings', icon: Settings },
                                { id: 'store', name: 'Store Information', icon: Store },
                                { id: 'hours', name: 'Operating Hours', icon: Clock },
                                { id: 'security', name: 'Security Information', icon: Shield  },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                        activeTab === item.id
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mr-2" />
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="md:col-span-9 mt-5 md:mt-0">
                        <div className="bg-white shadow rounded-lg">
                            {activeTab === 'general' && (
                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Business Name</label>
                                            <input
                                                type="text"
                                                className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                                defaultValue="Sweet Success Bakery"
                                            />
                                        </div>
                                        <div>
                                            <label className="block py-2 text-sm font-medium text-gray-700">Currency</label>
                                            <select
                                                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                                defaultValue="USD"
                                            >
                                                <option>USD</option>
                                                <option>EUR</option>
                                                <option>GBP</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Notification Preferences */}
                                    <div className="mt-6 p-4 border rounded-lg">
                                        <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                                            <Bell /> Notification Preferences
                                        </h2>
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="orderAlerts"
                                                checked={notifications.orderAlerts}
                                                onChange={handleNotificationChange}
                                            />
                                            <span>Enable Order Alerts</span>
                                        </label>
                                        <label className="flex items-center space-x-3 mt-3">
                                            <input
                                                type="checkbox"
                                                name="stockAlerts"
                                                checked={notifications.stockAlerts}
                                                onChange={handleNotificationChange}
                                            />
                                            <span>Enable Low Stock Alerts</span>
                                        </label>
                                        <label className="flex items-center space-x-3 mt-3">
                                            <input
                                                type="checkbox"
                                                name="businessAlerts"
                                                checked={notifications.businessAlerts}
                                                onChange={handleNotificationChange}
                                            />
                                            <span>Enable Business Alerts</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'store' && (
                                <div>Store</div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
