import React from "react";
import {Sidebar,DashHeader,NewsFeed,DashCenter} from "../websiteComponent/Dashboard/index";

function Dashboard(){
    return(
        <div>
            <DashHeader />
            <div className="Dashboard-height">
                <Sidebar />
                <DashCenter />
                <NewsFeed /> 
            </div>
            
        </div>
    )
}

export default Dashboard