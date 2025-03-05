import React, { useState } from "react";
import { Users, Search, Download, PlusCircle, Filter, Ban, Trash2 } from "lucide-react";

// Sample users data
const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", orders: 10, registered: "2023-08-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", orders: 5, registered: "2023-09-20", status: "Suspended" },
    { id: 3, name: "Emily Johnson", email: "emily@example.com", role: "Customer", orders: 12, registered: "2023-07-10", status: "Active" },
    { id: 4, name: "Mark Brown", email: "mark@example.com", role: "Customer", orders: 2, registered: "2023-11-05", status: "Pending" },
];

const UserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
    );

    const toggleUserStatus = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id
                    ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
                    : user
            )
        );
    };

    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    const exportToCSV = () => {
        const csvContent = [
            ["ID", "Name", "Email", "Role", "Orders", "Registered", "Status"],
            ...users.map((user) => [
                user.id,
                user.name,
                user.email,
                user.role,
                user.orders,
                user.registered,
                user.status,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
            case "Suspended":
                return "bg-red-50 text-red-700 ring-red-600/20";
            case "Pending":
                return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
            default:
                return "bg-gray-50 text-gray-700 ring-gray-600/20";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 ml-72">
            <div className="p-8 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-8 mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                            <Users className="w-7 h-7 text-gray-700" />
                            Users
                            <span className="text-sm font-normal text-gray-500">
                ({users.length} total)
              </span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={exportToCSV}
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <PlusCircle className="w-4 h-4" />
                                Add User
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
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

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 px-6 text-left">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        onChange={(e) =>
                                            setSelectedUsers(
                                                e.target.checked ? users.map((u) => u.id) : []
                                            )
                                        }
                                    />
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Orders
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
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={(e) =>
                                                setSelectedUsers(
                                                    e.target.checked
                                                        ? [...selectedUsers, user.id]
                                                        : selectedUsers.filter((id) => id !== user.id)
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                            </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Joined {user.registered}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        {user.role}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        {user.orders}
                                    </td>
                                    <td className="py-4 px-6">
                      <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(
                              user.status
                          )}`}
                      >
                        {user.status}
                      </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleUserStatus(user.id)}
                                                className={`p-1 rounded-lg hover:bg-gray-100 ${
                                                    user.status === "Active"
                                                        ? "text-yellow-600 hover:text-yellow-700"
                                                        : "text-emerald-600 hover:text-emerald-700"
                                                }`}
                                                title={user.status === "Active" ? "Suspend User" : "Activate User"}
                                            >
                                                <Ban className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-1 rounded-lg hover:bg-gray-100 text-red-600 hover:text-red-700"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
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

export default UserManagement;