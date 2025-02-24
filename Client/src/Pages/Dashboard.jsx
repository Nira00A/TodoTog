import React from "react";
import {Sidebar,DashHeader,DashCenter} from "../websiteComponent/Dashboard/index";

function Dashboard(){
    return(
        <div>
            <DashHeader />
            <div className="Dashboard-height">
                <Sidebar />
                <DashCenter />
            </div>
            
        </div>
    )
}

export default Dashboard