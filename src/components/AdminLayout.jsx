import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Sidebar */}
                <aside className="hidden md:flex md:flex-shrink-0">
                   <Sidebar className='fixed top-0 md:top-0 md:left-0' />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>


        </div>
    );
};

export default AdminLayout;