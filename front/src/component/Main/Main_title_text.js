import React, { useState } from 'react';
import './Main_title_text.css';
import site_title from '../../Img/site_title.png';
function Main_title(){

    return(
        <div className="main-title">
        
        <img className="main-title-img" src={site_title}></img>
        </div>
    );
}
export default Main_title;