import React, { useEffect, useState } from "react";
import { useFeature } from "../../context/FeatureContext";

export default function Toogle(){
    
    const {toogleChecked , setToogleChecked} = useFeature()

    useEffect(() => {
        if (toogleChecked) {
            setLightMode()
        } else {
            setDarkMode()
        }
        localStorage.setItem("toggle", toogleChecked); 
    }, [toogleChecked]);

    const setDarkMode = () =>{
        document.querySelector("body").setAttribute("data-theme" , "dark")
    }

    const setLightMode = () =>{
        document.querySelector("body").setAttribute("data-theme" , "light")
    }

    const handleToogle = () =>{
        setToogleChecked((prev) => !prev)
    }

    return(
        <div onClick={handleToogle} className={`toggle-div h-[30px] w-[30px] max-navsm:h-[24px] max-navsm:w-[24px] ${toogleChecked ? 'toggle-day' : 'toggle-night'}`}>
            {toogleChecked ? (
                <svg className="w-[20px] transition-all max-navsm:w-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M479.96-144Q340-144 242-242t-98-238q0-140 97.93-238t237.83-98q13.06 0 25.65 1 12.59 1 25.59 3-39 29-62 72t-23 92q0 85 58.5 143.5T648-446q49 0 92-23t72-62q2 13 3 25.59t1 25.65q0 139.9-98.04 237.83t-238 97.93Z"/></svg>
            ) : (
                <svg className="w-[20px] transition-all max-navsm:h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1D1D1D"><path d="M479.77-288Q400-288 344-344.23q-56-56.22-56-136Q288-560 344.23-616q56.22-56 136-56Q560-672 616-615.77q56 56.22 56 136Q672-400 615.77-344q-56.22 56-136 56ZM216-444H48v-72h168v72Zm696 0H744v-72h168v72ZM444-744v-168h72v168h-72Zm0 696v-168h72v168h-72ZM269-642 166-742l51-55 102 104-50 51Zm474 475L642-268l49-51 103 101-51 51ZM640-691l102-101 51 49-100 103-53-51ZM163-217l105-99 49 47-98 104-56-52Z"/></svg>
            )}
        </div>
    )
}