import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Bell,
    Key,
    Camera,
    Clock,
    Building
} from 'lucide-react';

function AdminProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [showNotificationSettings, setShowNotificationSettings] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Baker",
        email: "john.baker@connection.com",
        phone: "+91 9709108923",
        address: "123 Bakery Street, Sweet Town",
        joinDate: "January 15, 2024",
        role: "Head Administrator",
        bakeryName: "The Cream Connection",
        lastLogin: "Today at 9:30 AM",
        profileImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200&h=200"
    });

    const [notifications, setNotifications] = useState({
        orderAlerts: true,
        inventoryAlerts: true,
        staffMessages: true,
        marketingUpdates: false,
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Implement profile update logic here
    };

    const handleNotificationChange = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold text-gray-900">{profile.name}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Building size={16} />
                                {profile.bakeryName}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                  <Shield size={14} className="mr-1" />
                    {profile.role}
                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                  <Clock size={14} className="mr-1" />
                  Active
                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Personal Information */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={profile.name}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                            />
                                            <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={profile.email}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                            />
                                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-500">Member Since</label>
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <Calendar size={16} />
                                        {profile.joinDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminProfilePage;
