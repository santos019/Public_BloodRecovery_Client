import React from "react";
import './Common_Button.css';
const Common_Button =({name})=>{

    return (

        <div className="Common-Button-class">
            <div className="Common-Button-text-class">{name}</div>
        </div>
    )
}

export default Common_Button;