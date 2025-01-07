import React from "react";
import {Sidebar,DashHeader,NewsFeed,DashCenter} from "../../dashboardBuilderComponent/index.js";

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