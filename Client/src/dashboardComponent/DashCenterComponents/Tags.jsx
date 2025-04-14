import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Tags({name , color , fontColor ,  onTagClick}){ 
    return(
        <div>
            <div onClick={() => onTagClick([name , color])} style={{backgroundColor: color , color:"white"}} className={`tag-style`}>
                {name}
            </div>
        </div>
    )
}

export function ShowPopup({message , cond}){
    return(
        <div className={`select-none top-[2%] right-4 z-[1000000] h-[50px] w-[250px] ${cond === 'success' ? 'bg-green-200' : "bg-red-200" } rounded-md absolute flex items-center gap-1 pl-2 animate-popdown shadow-md`}>
            {cond === 'success' ? 
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="green"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="red"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            }
            <div className="flex w-[90%] items-center justify-between pr-1">
                {cond === 'success' ? 
                <div className="flex flex-col">
                    <div className="text-[14px] text-green-700 font-semibold">Success</div>
                    <div className="text-[8px] text1">{message}</div>
                </div> 
                :
                <div className="flex flex-col">
                    <div className="text-[14px] text-red-700 font-semibold">Error</div>
                    <div className="text-[8px] text1">{message}</div>
                </div>
                }
                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="gray"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
        </div>
    )
}

export const notify = ({message , cond}) => {
    if(cond === 'success'){
        return toast.success(message, {
        position:"top-right" 
        });
    }
    if(cond === 'info'){
        return toast.info(message, {
        position:"bottom-left" 
        });
    }
    if(cond === 'warn'){
        return toast.warn(message, {
        position:"top-right" 
        });
    }
    if(cond === 'error'){
        return toast.error(message, {
        position:"top-right" 
        });
    }
  };