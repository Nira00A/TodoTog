import React from "react";

export function Tags({name , color , fontColor ,  onTagClick}){ 
    return(
        <div>
            <div onClick={() => onTagClick([name , color])} style={{backgroundColor: color , color:"white"}} className={`tag-style`}>
                {name}
            </div>
        </div>
    )
}

export function ShowPopup({message}){
    return(
        <div className={`top-[2%] right-4 h-[50px] w-[250px] bg-green-200 rounded-md absolute flex items-center gap-1 pl-2 animate-popdown shadow-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="green"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            <div className="flex w-[90%] items-center justify-between pr-1">
                <div className="flex flex-col">
                    <div className="text-[14px] text-green-700 font-semibold">Sucess</div>
                    <div className="text-[8px] text1">{message}</div>
                </div>
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="gray"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
        </div>
    )
}