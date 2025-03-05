import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar({ className = "" }) {
    const [expanded, setExpanded] = useState(true);

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
        { icon: Users, label: "User Management", path: "users" },
        { icon: ShoppingBag, label: "Product Management", path: "Product-management" },
        { icon: ClipboardList, label: "Order Management", path: "order-management" },
        { icon: BarChart3, label: "Analytics", path: "analytics" },
        { icon: Settings, label: "Settings", path: "settings" },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
                expanded ? "w-72" : "w-20"
            } ${className} flex flex-col`}
        >
            {/* Logo and Toggle */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                <div className={`flex items-center gap-3 ${!expanded && "justify-center w-full"}`}>
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-semibold">A</span>
                    </div>
                    {expanded && (
                        <span className="font-semibold text-gray-900">
              Admin Panel
            </span>
                    )}
                </div>
                {expanded && (
                    <button
                        onClick={() => setExpanded(false)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = window.location.pathname.includes(item.path);
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative
                ${isActive
                                ? "text-blue-600 bg-blue-50 font-medium"
                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                            }
                ${!expanded && "justify-center"}
              `}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors
                ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}
              `} />

                            {expanded ? (
                                <span className="text-sm">{item.label}</span>
                            ) : (
                                <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
                <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-all group
            ${!expanded && "justify-center"}
          `}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-red-600" />
                    {expanded ? (
                        <span className="text-sm">Logout</span>
                    ) : (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;