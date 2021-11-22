import React from "react";
import "./Header_nav.css";
const Header_nav=(props)=>{


    const sendValue=(text)=>{
                 props.getsetValue(text);
             }
    return (

        <div className="Header-nav-class">
            <div className="Header-nav-list-class">
                <div className="Header-nav-Login-class" onClick={()=>sendValue("로그인")}>
                    로그인
                </div>
                <div className="Header-nav-Join-class" onClick={()=>sendValue("회원가입")}>
                    회원가입
                </div>
            </div>
        </div>

    )

}

export default Header_nav;