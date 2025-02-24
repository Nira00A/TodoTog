import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashHeader, NewsFeed, Sidebar } from "./websiteComponent/Dashboard/index";

function DashboardLayout() {

    return (
            <div className="flex">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-full h-full">
                    <header className="dash-header">
                        <DashHeader />
                    </header>
                    <main className="main-content">
                        <Outlet />
                    </main>
                </div>
            </div>
        
    );
}

export default DashboardLayout;
