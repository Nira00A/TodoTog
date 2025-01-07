import { useState } from "react";
import React from "react";


export default function DashCard({name , subName , color , svg , status , textcolor = 'black'}){
    return(
        <div className='dashCard column'>
            <div className={`flex justify-between text-sm ${color} p-2 rounded-t-md`}>
                <div className={`text-${textcolor}`}>
                    {name}
                </div>
                {svg}
            </div>
            <div className="pl-2 pr-2 text-md pt-2">
                {subName}
                <ProgressBar status={status}/>
            </div>
        </div>
    )
    
}

function ProgressBar({status}) {
    const [progress, setProgress] = useState(30);

    const handleColor = () => {
        if (progress < 40) {
            return "#ff0000";
        } else if (progress < 60) {
            return "#ff8800";
        } else {
            return "green";
        }
    };

    return (
        <div>
            <div className="progressBarContainer">
                <div
                    className="progressBarFill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: handleColor(),
                    }}
                ></div>
            </div>
            <div className="text-black text-xs">
                {progress}% {status}
            </div>
            
        </div>
    );
}