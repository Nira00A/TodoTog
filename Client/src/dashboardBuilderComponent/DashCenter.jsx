import {React , useState} from "react";
import {DashCard , DashTabCard , CompleteSvg, PendingSvg, StreakSvg, ItemsInventory , DashTab} from "../dashboardComponent/index";


export default function DashCenter(){
    return(
        <div className="dashCenter">
            <div className="dashCenterName">
                Welcome to TodoTog , user
            </div>
            <div className="flex gap-5">
                <DashCard color='bg-orange1' name='Complete' subName='Total Completed' svg={<CompleteSvg/>} status='Completed'/>
                <DashCard color='bg-yellow1' name='Pending' subName='Total Pending' svg={<PendingSvg/>} status='Pending'/>
                <DashCard color='bg-blue1' textcolor="white" name='Streaks' subName='Streaks' svg={<StreakSvg/>} status='Streaks'/>
                <DashCard color='bg-black' textcolor="white" name='Powerups' subName='Total Pops' status='Powers'/>
            </div>
            <div className="mt-5 gap-5 flex">
                <DashTab />
                <DashTabCard />
                <DashTabCard />
            </div>
            
        </div>
    )
}