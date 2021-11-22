import React from "react";
import './Common_Button_IMG.css';
const Common_Button_IMG =({name,imgname})=>{

    return (

        <div className="Common-Button-IMG-class">
            <div className="Common-Button-IMG-margin-class">
            <img src={imgname} className="Common-Button-IMG-img-class"></img>
            <div className="Common-Button-IMG-text-class">{name}</div>
            </div>
        </div>
    )
}

export default Common_Button_IMG;