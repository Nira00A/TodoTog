import React from "react"; 
import { NavLink } from "react-router-dom";

export default function RewardsPage(){

    const badge = [
        {name: 'Nerd' , desc: 'No skipping a day!' , cond: 'Complete todos daily for 10 days without breaking the streak', img:'/Images/Badges/nerd.png'},
        {name: 'Todo Master' , desc: "You're the master of tasks!" , cond: 'Complete 100 todos' , img: '/Images/Badges/todoMaster.png'},
        {name: 'Productive Pro' , desc: 'Consistency is the key!' , cond: 'Complete 10 todos daily for 10 days', img: '/Images/Badges/productivePro.png'},
        {name: 'Streak Legend' , desc: 'Built an unstoppable habit!' , cond: 'Reach a 50-day streak', img: '/Images/Badges/streakLegend.png'},
        {name: 'Accomplisher' , desc: "You don't just plan, you execute!" , cond: 'Complete 1000 todos', img: '/Images/Badges/accomplisher.png'},
        {name: 'Deadline Destroyer' , desc: 'Always on time!' , cond: 'Complete 10 todos in a row before the due time', img: '/Images/Badges/deadlineDestroyer.png'}
    ]

    const points = [
        {name:'Points Earned' , points:"200" , img:"/Images/Badges/pointsEarned.png"},
        {name:'Achievements' , points:"200" , img:"/Images/Badges/achievementEarned.png"},
        {name:'Xps Earned' , points:"200" , img:"/Images/Badges/pointsEarned.png"}
    ]

    return(
            <div className="w-full h-full flex justify-center overflow-scroll scrollbar-none relative">
                <div className="w-[1150px] h-full p-3 relative max-navlg:w-full">
                    <div className="mb-5 max-navlg:w-full">
                        <div className="heading">Achievements</div>
                        <div className="text-neutral-500 text-sm">Earn achievements by completing daily todos</div>
                    </div>

                    <div className="transition-all duration-500 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)] flex gap-3 justify-between max-navlg:w-[100%] max-sm:flex-col">
                        {points.map((items,index)=>(
                        <div key={index} className="flex div-color w-full rounded-md items-center">
                            <div style={{backgroundImage: `url(${items.img})`}} className="bg-cover bg-center h-20 w-20">

                            </div>

                            <div className="text4">
                                <div className="text-sm">{items.name}</div>
                                <div className="text-xl text4 font-bold">
                                    {items.points}
                                </div>
                                <div className="cursor-pointer text-blue-400" style={{fontSize: '12px'}}>Earn more -{`>`}</div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="flex-col h-full mt-6 relative max-navlg:w-full">
                        <div>
                            <div className="text-xl text4 font-semibold">
                                Activity
                            </div>
                            <div className="text-neutral-500 text-sm">
                                Earn Xp with each completed achievement
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center mt-6 relative max-navlg:w-full">
                            {badge.map((items , index)=>(
                                <Badges key={index} name={items.name} desc={items.desc} img={items.img}/>
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
        <div style={{filter: 'grayscale(80%)' , opacity: '0.5'}} className="achievement-badge w-[200px] h-[320px] max-navmd:w-full max-navmd:h-max">
            <div className="flex justify-end pr-2 text-yellow-300 text-2xl max-navmd:hidden">
                +5
            </div>
            
            <div className="flex flex-col items-center max-navmd:flex-row">
                <div className="h-40 w-40 flex bg-cover bg-center max-navmd:h-20 max-navmd:w-20" style={{backgroundImage: `url(${img})`}}>
                    <img src="/Images/Badges/third.png" alt="" />
                </div>
                <div className='flex flex-col max-navmd:items-start'>  
                    <div className="flex text4 justify-center mt-3 max-navmd:m-0 max-navmd:justify-start">
                        {name}
                    </div>

                    <div className="text-xs text-center text-neutral-500 mt-5 max-navmd:m-0 max-navmd:text-start">
                        {desc}
                    </div>
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
