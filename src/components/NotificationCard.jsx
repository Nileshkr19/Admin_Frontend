import React, { useState } from "react";
import { Bell, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationCard = () => {
    const [notifications, setNotifications] = useState(notificationsData);
    const [showDropdown, setShowDropdown] = useState(false);

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <div className="relative">
            <div
                className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <Bell className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute flex items-center justify-center -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] min-h-[2px] ">
            {unreadCount}
          </span>
                )}
            </div>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <Link
                            to="notifications"
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            onClick={() => setShowDropdown(false)}
                        >
                            View All
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="p-8 text-gray-500 text-sm text-center">
                            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            No new notifications
                        </div>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto">
                            <ul className="divide-y divide-gray-100">
                                {notifications.slice(0, 5).map((notif) => (
                                    <li
                                        key={notif.id}
                                        className={`flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors ${
                                            !notif.read ? 'bg-blue-50 hover:bg-blue-50/80' : ''
                                        }`}
                                    >
                                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                            getNotificationColor(notif.type)
                                        }`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{notif.time}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeNotification(notif.id);
                                            }}
                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const getNotificationColor = (type) => {
    switch (type) {
        case 'order':
            return 'bg-green-500';
        case 'alert':
            return 'bg-red-500';
        case 'info':
            return 'bg-blue-500';
        default:
            return 'bg-gray-500';
    }
};

export const notificationsData = [
    {
        id: 1,
        message: "New order #1234 received for Birthday Cake",
        time: "2m ago",
        type: "order",
        read: false,
        date: new Date(Date.now() - 120000)
    },
    {
        id: 2,
        message: "Stock running low on Chocolate Cake (5 pieces remaining)",
        time: "15m ago",
        type: "alert",
        read: false,
        date: new Date(Date.now() - 900000)
    },
    {
        id: 3,
        message: "Scheduled maintenance tomorrow at 10 PM",
        time: "1h ago",
        type: "info",
        read: true,
        date: new Date(Date.now() - 3600000)
    },
    {
        id: 4,
        message: "New review received: 5 stars for Vanilla Cupcakes",
        time: "2h ago",
        type: "info",
        read: true,
        date: new Date(Date.now() - 7200000)
    },
    {
        id: 5,
        message: "Order #1230 has been delivered successfully",
        time: "3h ago",
        type: "order",
        read: true,
        date: new Date(Date.now() - 10800000)
    }
];

export default NotificationCard;