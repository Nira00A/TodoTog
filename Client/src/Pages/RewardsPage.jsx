import React from "react"; 
import { NavLink } from "react-router-dom";

export default function RewardsPage(){

    const badge = [
        {name: 'Nerd' , desc: 'Completed an entire book without skipping a single day!' , cond: 'Complete todos daily for 10 days without breaking the streak'},
        {name: 'Todo Master' , desc: "You're the master of tasks!" , cond: 'Complete 100 todos'},
        {name: 'Productive Pro' , desc: 'Consistency is the key!' , cond: 'Complete 10 todos daily for 10 days'},
        {name: 'Streak Legend' , desc: 'Built an unstoppable habit!' , cond: 'Reach a 50-day streak'},
        {name: 'Accomplisher' , desc: "You don't just plan, you execute!" , cond: 'Complete 1000 todos'},
        {name: 'Deadline Destroyer' , desc: 'Always on time!' , cond: 'Complete 10 todos in a row before the due time'}
    ]

    return(
            <div className="w-full h-full flex justify-center overflow-scroll relative">
                <div className="w-9/12 relative">
                    <div className="mb-5">
                        <div className="heading">Achievements</div>
                        <div className="text-neutral-500 text-sm">Earn achievements by completing daily todos</div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex div-color pr-10 rounded-md items-center">
                            <div style={{backgroundImage: 'url(/Images/Badges/earn.png)'}} className="bg-cover bg-center h-28 w-28">

                            </div>

                            <div className="text4">
                                <div className="text-lg">Points Earned</div>
                                <div className="text-2xl text4 font-bold">
                                    264
                                </div>
                                <div className="cursor-pointer text-blue-400" style={{fontSize: '12px'}}>Earn more -{`>`}</div>
                            </div>
                        </div>

                        <div className="flex div-color pr-10 rounded-md items-center">
                            <div style={{backgroundImage: 'url(/Images/Badges/earn.png)'}} className="bg-cover bg-center h-28 w-28">

                            </div>

                            <div className="text4">
                                <div className="text-lg">Points Earned</div>
                                <div className="text-2xl text4 font-bold">
                                    264
                                </div>
                                <div className="cursor-pointer text-blue-400" style={{fontSize: '12px'}}>Earn more -{`>`}</div>
                            </div>
                        </div>

                        <div className="flex div-color pr-10 rounded-md items-center">
                            <div style={{backgroundImage: 'url(/Images/Badges/earn.png)'}} className="bg-cover bg-center h-28 w-28">

                            </div>

                            <div className="text4">
                                <div className="text-lg">Points Earned</div>
                                <div className="text-2xl text4 font-bold">
                                    264
                                </div>
                                <div className="cursor-pointer text-blue-400" style={{fontSize: '12px'}}>Earn more -{`>`}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-col h-full mt-6 relative">
                        <div>
                            <div className="text-xl text4 font-semibold">
                                Activity
                            </div>
                            <div className="text-neutral-500 text-sm">
                                Earn Xp with each completed achievement
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full gap-3 items-center mt-6 relative">
                            {badge.map((items , index)=>(
                                <Badges key={index} name={items.name} desc={items.desc}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

function BadgesBar({img , name}){
    return(
        <div className="badge-body">
            <div style={{backgroundImage: `url(${img})`}} className="h-14 w-14 bg-black rounded-full">
            </div>

            <div className="flex-col6 items-center">
                <div className="text-xs">
                    {name}
                </div>
                <div className="flex items-center text-xs gap-2">
                    <div className="badge-progress-bar"></div>
                    <div>100%</div>
                </div>
            </div>
        </div>
    )
}

function Badges({img , name , desc , tag}){
    return(
        <div className="achievement-badge">
            <div className="flex justify-end pr-2 text-yellow-300 text-2xl">
                +5
            </div>
            
            <div className="flex-col justify-items-center">
                <div className="h-40 w-40 flex" style={{backgroundImage: `url(${img})`}}>
                    <img src="/Images/Badges/third.png" alt="" />
                </div>
                    
                <div className="flex text4 justify-center mt-3">
                    {name}
                </div>

                <div className="text-xs text-center text-neutral-500 mt-5">
                    {desc}
                </div>
            </div>
        </div>
    )
}

function Tags({name}){
    return(
        <div>
            {name === 'common' && (
            <div className="badge-tag badge-common">
                {name}
            </div>
            )}
            {name === 'rare' && (
                <div className="badge-tag badge-rare">
                    {name}
                </div>
            )}
            {name === 'ultra' && (
                <div className="badge-tag badge-ultra">
                    {name}
                </div>
            )}
        </div>
    )
}
