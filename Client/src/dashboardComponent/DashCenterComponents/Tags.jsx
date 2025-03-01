import React from "react";

export default function Tags({name , color , fontColor ,  onTagClick}){ 
    return(
        <div>
            <div onClick={() => onTagClick([name , color])} style={{backgroundColor: color , color:"white"}} className={`tag-style`}>
                {name}
            </div>
        </div>
    )
}