import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashHeader, NewsFeed, Sidebar } from "./websiteComponent/Dashboard/index";

function DashboardLayout() {

    const location = useLocation()
    const isDashPage = location.pathname.endsWith('/dashboard')

    return (
        <div className="dashboard-layout">
            <header className="dash-header">
                <DashHeader />
            </header>
            <div className="dash-body">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <main className="main-content">
                    <Outlet />
                </main>
                { isDashPage &&
                <div className="news-feed">
                    <NewsFeed />
                </div>
                }
            </div>
        </div>
    );
}

export default DashboardLayout;
