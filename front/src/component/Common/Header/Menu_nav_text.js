import React, { useState } from 'react';
import propTypes from 'prop-types';
import './Menu_nav_text.css';

const Menu_nav_text=({name,imgname})=>{



    return (
        <div className="Menu-nav-text">
            <img className="Menu-nav-img-class" src={imgname}></img>
            <h1 className="Menu-nav-h1-class">{name}</h1>
        </div>

    );
}
Menu_nav_text.defaultProps={
    name:'기본이름'
};

Menu_nav_text.propTypes={
    name: propTypes.string
};


export default Menu_nav_text;

