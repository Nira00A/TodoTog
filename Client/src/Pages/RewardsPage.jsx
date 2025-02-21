import React from "react"; 
import { NavLink } from "react-router-dom";

export default function RewardsPage(){
    return(
            <div className="w-full h-full flex justify-center">
                <div className="rewards-container">
                    <div>
                        <div className="component-header-text ml-3">Achievements</div>
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between">
                            <div>
                                <div className="achievement-title ml-3">
                                    General
                                </div>
                                <div className="achievement-count ml-3">
                                    0 out of 5 unlocked
                                </div>
                            </div>
                            <div className="badge-viewmore">
                                <NavLink to={'/task'}>
                                    view more {'>'}
                                </NavLink>
                            </div>
                        </div>
                            
                        <div className="badge-container">
                            <Badges name={'Joined'} tag={<Tags name={'common'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/first.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'rare'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/second.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'ultra'}/>} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between">
                            <div>
                                <div className="achievement-title ml-3">
                                    General
                                </div>
                                <div className="achievement-count ml-3">
                                    0 out of 5 unlocked
                                </div>
                            </div>
                            <div className="badge-viewmore">
                                <NavLink to={'/task'}>
                                    view more {'>'}
                                </NavLink>
                            </div>
                        </div>
                            
                        <div className="badge-container">
                            <Badges name={'Joined'} tag={<Tags name={'common'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/first.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'rare'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/second.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'ultra'}/>} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <div className="flex justify-between">
                            <div>
                                <div className="achievement-title ml-3">
                                    General
                                </div>
                                <div className="achievement-count ml-3">
                                    0 out of 5 unlocked
                                </div>
                            </div>
                            <div className="badge-viewmore">
                                <NavLink to={'/task'}>
                                    view more {'>'}
                                </NavLink>
                            </div>
                        </div>
                            
                        <div className="badge-container">
                            <Badges name={'Joined'} tag={<Tags name={'common'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/first.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'rare'}/>} desc={'This is a sample text'} date={'12/12/2012'} imgLink={'/Images/Badges/second.png'}/>
                            <Badges name={'Joined'} tag={<Tags name={'ultra'}/>} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                            <Badges name={'Joined'} tag={'tags'} desc={'This is a sample text'} date={'12/12/2012'}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function Badges({imgLink , name , date , tag}){
    return(
        <div className="badge">
            <div className="badge-header">
                {tag}
            </div>
            <div className="badge-img">
                <img width='110px' src={imgLink}/>
            </div>
            <div className="badge-footer">
                <div className="badge-name">
                    {name}
                </div>
                <div className="badge-date">
                    {date}
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
