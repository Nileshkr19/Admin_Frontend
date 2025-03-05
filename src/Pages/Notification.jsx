import React, { useState } from "react";
import { Bell, Filter, Check, X, ArrowLeft } from "lucide-react";
import { notificationsData } from "../components/NotificationCard";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(notificationsData);
    const [selectedType, setSelectedType] = useState("all");
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const filterTypes = [
        { id: "all", label: "All" },
        { id: "order", label: "Orders" },
        { id: "alert", label: "Alerts" },

    ];

    const filteredNotifications = notifications
        .filter((notif) =>
            (selectedType === "all" ||
                (selectedType === "history" ? notif.read : notif.type === selectedType)) &&
            (!showUnreadOnly || !notif.read)
        )
        .sort((a, b) => b.date - a.date);

    const markAllAsRead = () => {
        setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    {notifications.filter(n => !n.read).length} unread
                                </span>
                            </div>
                            <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                Mark all as read
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                                    showUnreadOnly
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Check className="w-4 h-4" />
                                Unread only
                            </button>
                            <button
                                onClick={clearAll}
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    {filterTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                                selectedType === type.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-500">
                            {notifications.length === 0
                                ? "You're all caught up! No notifications to display."
                                : "No notifications match your current filters."}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                        {filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`flex items-start gap-4 p-4 ${
                                    !notif.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                                } transition-colors`}
                            >
                                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                    getNotificationColor(notif.type)
                                }`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900">{notif.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
                                </div>
                                <button
                                    onClick={() => removeNotification(notif.id)}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const getNotificationColor = (type) => {
    switch (type) {
        case 'order':
            return 'bg-green-500';
        case 'alert':
            return 'bg-red-500';
        case 'history':
            return 'bg-gray-400';
        default:
            return 'bg-gray-500';
    }
};

export default NotificationsPage;
